import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MinusSmallIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import instance from "api/axios";
import { Location } from "components/location/location";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { useLogout } from "hooks/useAuthApi";
import { useGetChatList } from "hooks/useChatApi";
import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "store/User";
import h from "./header.module.scss";
import { chatList, getChatListAtom } from "store/Chat";
import { getCookie, removeCookie } from "util/authCookie";

const faqs = [
  {
    menuTitle: "마이페이지",
    detailTitle2: "줍줍내역",
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    data: chatRoomCount,
    refetch: refetchChatList,
    isSuccess,
  } = useGetChatList();
  const [userName] = useAtom(userAtom);
  const navigate = useNavigate();
  const [, setChatList] = useAtom(getChatListAtom);

  // const result = chatRoomCount?.map((item) => item.id);
  // console.log(
  //   "넣을 데이터",
  //   chatRoomCount?.map((item) => item.id)
  // );
  // if(result) {
  //   console.log('들어가도됨?');
  //   setChatList(result);
  // }
  useEffect(() => {
    if (isSuccess && chatRoomCount) {
      const result = chatRoomCount.map((item) => ({
        id: item.id,
        giveaway_id: item.giveaway_id,
      }));
      setChatList(result); // Jotai atom에 데이터 저장
    }
  }, [isSuccess, chatRoomCount]);

  useEffect(() => {
    const accessToken = getCookie("jup-jup-atk");
    setIsLoggedIn(!!accessToken);

    const handleLoginStateChange = () => {
      const newAccessToken = getCookie("jup-jup-atk");
      setIsLoggedIn(!!newAccessToken);
    };

    window.addEventListener("loginStateChange", handleLoginStateChange);

    return () => {
      window.removeEventListener("loginStateChange", handleLoginStateChange);
    };
  }, [userName.userName]);

  const { refetch } = useLogout();

  const handleLogout = useCallback(() => {
    instance
      .post(`${process.env.PUBLIC_URL}/v1/auth/logout`)
      .then(() => {
        removeCookie("jup-jup-atk");
        removeCookie("jup-jup-rtk");
        document.cookie = "JSESSIONID=; max-age=0; path=/;";

        setIsLoggedIn(false);
        window.dispatchEvent(new Event("loginStateChange"));

        window.location.href = `/`;
      })
      .catch((error) => {
        setErrorMessage("로그아웃 중 문제가 발생했습니다.");
        removeCookie("jup-jup-atk");
        removeCookie("jup-jup-rtk");
        setOpenErrorModal(true);
      })
      .finally(() => {
        setMobileMenuOpen(false);
      });
  }, [refetch]);

  const handleLinkClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

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
          {userName.userName && (
            <div className={h.userInfo}>
              <Gravatar
                email={`${userName.userName}`}
                className={h.userAvatar}
              />
              <p className={h.userName}>{userName.userName}</p>
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
                          state={{ type: "old", giveawayId: "header" }}
                        >
                          <span>채팅</span>
                          {userName.userName && (
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
                          )}
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
