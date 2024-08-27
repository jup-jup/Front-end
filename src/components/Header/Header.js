'use client'
import React, { useEffect, useState, Fragment } from 'react';
import h from './header.module.scss';
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  Transition,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    menuTitle: "마이페이지",
    detailTitle1: "프로필수정",
    detailTitle2: "줍줍내역",
  },
  // More questions...
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('userEmail');
    setIsLoggedIn(!!accessToken);

    const handleLoginStateChange = () => {
      const newAccessToken = sessionStorage.getItem('userEmail');
      setIsLoggedIn(!!newAccessToken);
    };

    window.addEventListener('loginStateChange', handleLoginStateChange);

    return () => {
      window.removeEventListener('loginStateChange', handleLoginStateChange);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStateChange'));
    // 로그아웃 api 연결 하기
    setMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={h.header}>
      <nav className={h.nav}>
        <div className={h.logoContainer}>
          <Link to="/" className={h.logoLink}>
            <span className={h.srOnly}>Your Company</span>
            <img alt="" src={'/main/204219337.jpg'} className={h.logoImage} />
            <p className={h.logoText}>JUPJUP</p>
          </Link>
        </div>
        <div className={h.menuButtonContainer}>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={h.menuButton}
          >
            <span className={h.srOnly}>Open main menu</span>
            <Bars3Icon aria-hidden="true" className={h.menuIcon} />
          </button>
        </div>
      </nav>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className={h.dialog} onClose={setMobileMenuOpen} static>
        <Transition.Child
            as={Fragment}
            enter={h.overlayEnter}
            enterFrom={h.overlayEnterFrom}
            enterTo={h.overlayEnterTo}
            leave={h.overlayLeave}
            leaveFrom={h.overlayLeaveFrom}
            leaveTo={h.overlayLeaveTo}
          >
            <div className={h.dialogOverlay} aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter={h.panelEnter}
            enterFrom={h.panelEnterFrom}
            enterTo={h.panelEnterTo}
            leave={h.panelLeave}
            leaveFrom={h.panelLeaveFrom}
            leaveTo={h.panelLeaveTo}
          >
            <div className={h.dialogPanelWrapper}>
              <Dialog.Panel className={h.dialogPanel}>
                <div className={h.dialogHeader}>
                  <Link to="/" className={h.dialogLogoLink} onClick={() => setMobileMenuOpen(false)}>
                    <span className={h.srOnly}>Your Company</span>
                    <img
                      alt=""
                      src={'/main/204219337.jpg'}
                      className={h.dialogLogoImage}
                    />
                    <p className={h.dialogLogoText}>JUPJUP</p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className={h.closeButton}
                  >
                    <span className={h.srOnly}>Close menu</span>
                    <XMarkIcon aria-hidden="true" className={h.closeIcon} />
                  </button>
                </div>
                <div className={h.menuContent}>
                  <div className={h.menuList}>
                    <div className={h.menuItems}>
                      <Link
                        to="/jupjup"
                        className={h.menuItem}
                        onClick={handleLinkClick}
                      >
                        줍줍
                      </Link>
                      <Link
                        to="/chatOtherList"
                        className={h.menuItem}
                        onClick={handleLinkClick}
                      >
                        <span>채팅</span>
                        <span className={h.badge}>
                          <svg className={h.badgeIcon} viewBox="0 0 6 6" aria-hidden="true">
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                          10
                        </span>
                      </Link>

                      <dl className={h.faqList}>
                        {faqs.map((faq) => (
                          <Disclosure key={faq.menuTitle} as="div" className={h.faqItem}>
                            {({ open }) => (
                              <>
                                <dt>
                                  <Disclosure.Button className={h.faqButton}>
                                    <span className={h.faqTitle}>{faq.menuTitle}</span>
                                    <span className={h.faqIcon}>
                                      {open ? (
                                        <MinusSmallIcon aria-hidden="true" className={h.minusIcon} />
                                      ) : (
                                        <PlusSmallIcon aria-hidden="true" className={h.plusIcon} />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className={h.faqPanel}>
                                  <Link to="/ProfileUpdate" className={h.faqLink} onClick={handleLinkClick}>{faq.detailTitle1}</Link>
                                  <br/>
                                  <Link to="/Mypage" className={h.faqLink} onClick={handleLinkClick}>{faq.detailTitle2}</Link>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </dl>
                    </div>
                    <hr />
                    <div className={h.authSection}>
                      {isLoggedIn ? (
                        <Link
                          onClick={handleLogout}
                          className={h.authLink}
                        >
                          로그아웃
                        </Link>
                      ) : (
                        <Link
                          to="/signin"
                          className={h.authLink}
                          onClick={handleLinkClick}
                        >
                          로그인
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </header>
  )
}

export default Header;