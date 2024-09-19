import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, MinusSmallIcon, PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";
import instance from "api/axios";
import { Location } from "components/location/location";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { useLogout } from "hooks/useAuthApi";
import { useGetChatList } from "hooks/useChatApi";
import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { userAtom } from "store/User";
import h from "./header.module.scss";

const faqs = [
  {
    menuTitle: "마이페이지",
    // detailTitle1: '프로필수정',
    detailTitle2: "줍줍내역",
  },
  // More questions...
];


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: chatRoomCount } = useGetChatList();
  const userName = useAtom(userAtom);

  console.log(userName, 'useAtom(userAtom)')

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);

    const handleLoginStateChange = () => {
      const newAccessToken = localStorage.getItem("accessToken");
      setIsLoggedIn(!!newAccessToken);
    };

    window.addEventListener("loginStateChange", handleLoginStateChange);

    return () => {
      window.removeEventListener("loginStateChange", handleLoginStateChange);
    };
  }, [userName]);

  const { refetch } = useLogout();

  const handleLogout = useCallback(() => {
    instance
      .post(`${process.env.PUBLIC_URL}/v1/auth/logout`)
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        document.cookie = "JSESSIONID=; max-age=0; path=/;";

        setIsLoggedIn(false);
        window.dispatchEvent(new Event("loginStateChange"));
      })
      .catch((error) => {
        setErrorMessage("로그아웃 중 문제가 발생했습니다.");
        setOpenErrorModal(true);
      })
      .finally(() => {
        setMobileMenuOpen(false);
      });
  }, [refetch]);


  const handleLinkClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  //

  return (
    <>
      <Location />
      <header className={h.header}>
        <nav className={h.nav}>
          <div className={h.logoContainer}>
            <Link to="/" className={h.logoLink}>
              <span className={h.srOnly}>Your Company</span>
              <img alt="" src={"/main/204219337.jpg"} className={h.logoImage} />
              <p className={h.logoText}>JUPJUP</p>
            </Link>
          </div>
          {userName && (
            <div className={h.userInfo}>
              <Gravatar email={`${userName}`} className={h.userAvatar} />
              <p className={h.userName}>{userName}</p>
            </div>
          )}
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
          <Dialog
            as="div"
            className={h.dialog}
            onClose={setMobileMenuOpen}
            static
          >
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
                    <Link
                      to="/"
                      className={h.dialogLogoLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={h.srOnly}>Your Company</span>
                      <img
                        alt=""
                        src={"/main/204219337.jpg"}
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
                            <svg
                              className={h.badgeIcon}
                              viewBox="0 0 6 6"
                              aria-hidden="true"
                            >
                              <circle cx="3" cy="3" r="3" />
                            </svg>
                            {chatRoomCount?.length}
                          </span>
                        </Link>

                        <dl className={h.faqList}>
                          {faqs.map((faq) => (
                            <Disclosure
                              key={faq.menuTitle}
                              as="div"
                              className={h.faqItem}
                            >
                              {({ open }) => (
                                <>
                                  <dt>
                                    <Disclosure.Button className={h.faqButton}>
                                      <span className={h.faqTitle}>
                                        {faq.menuTitle}
                                      </span>
                                      <span className={h.faqIcon}>
                                        {open ? (
                                          <MinusSmallIcon
                                            aria-hidden="true"
                                            className={h.minusIcon}
                                          />
                                        ) : (
                                          <PlusSmallIcon
                                            aria-hidden="true"
                                            className={h.plusIcon}
                                          />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                  </dt>
                                  <Disclosure.Panel
                                    as="dd"
                                    className={h.faqPanel}
                                  >
                                    {/* <Link
                                    to='/ProfileUpdate'
                                    className={h.faqLink}
                                    onClick={handleLinkClick}
                                  >
                                    {faq.detailTitle1}
                                  </Link> */}
                                    <br />
                                    <Link
                                      to="/Mypage"
                                      className={h.faqLink}
                                      onClick={handleLinkClick}
                                    >
                                      {faq.detailTitle2}
                                    </Link>
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
                          <Link onClick={handleLogout} className={h.authLink}>
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
        {/* 에러 발생 시 모달 표시 */}
        {openErrorModal && (
          <BasicModal
            setOnModal={setOpenErrorModal}
            className="error-modal"
            isDim
            onClose
            dimClick={() => setOpenErrorModal(false)}
          >
            {errorMessage}
          </BasicModal>
        )}
      </header>
    </>
  );
};

export default Header;
