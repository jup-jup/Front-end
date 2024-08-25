'use client'
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
// const products = [
//   { name: '홈', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]
// 테스트 중입니다 테스트 브랜치

//올라가는거 테스트중 lee브랜치 충돌 테스트 중

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
  };


  return (
    <header className="bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-0">
        <div className="flex lg:flex-1">
          <Link to ="/" className="-m-1.5 p-1.5 flex">
            <span className="sr-only">Your Company</span>
            <img alt="" src={'/main/204219337.jpg'} className="w-auto h-10" />
            <p className='ml-2 text-3xl font-black'>JUPJUP</p>
          </Link>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="w-6 h-6" />
          </button>
        </div>
        {/* <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to ="/" className="text-sm font-black leading-6">
            홈
          </Link>
          <Link to ="/jupjup" className="text-sm font-black leading-6">
            나눔하기
          </Link>

          <Link to ="/chatOtherList" className="text-sm font-black leading-6">
            채팅
          </Link>
          <Link to ="/ProfileUpdate" className="text-sm font-black leading-6">
            프로필수정
          </Link>
          <Link to ="/Mypage" className="text-sm font-black leading-6">
            MyPage
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>


        </PopoverGroup> */}
        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {isLoggedIn ? (
            <Link onClick={handleLogout} className="text-sm font-semibold leading-6">
              Log out <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <Link to="/signIn" className="text-sm font-semibold leading-6">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div> */}
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to ="/" className="-m-1.5 p-1.5 flex">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={'/main/204219337.jpg'}
                className="w-auto h-10"
              />
              <p className='ml-2 text-3xl font-black'>JUPJUP</p>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                <Link
                  to ="/jupjup"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  줍줍
                </Link>
                {/* <Link
                  to ="/beforeAfter"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  비포&에프터
                </Link> */}
                <Link
                  to ="/chatOtherList"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  <span>채팅</span>
                  <span class="ml-4 inline-flex items-center gap-x-1.5 rounded-full bg-pink-100 px-1.5 py-0.5 text-xs font-medium text-pink-700">
                    <svg class="h-1.5 w-1.5 fill-pink-500" viewBox="0 0 6 6" aria-hidden="true">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                    10
                  </span>

                </Link>
                <Link
                  to ="/ProfileUpdate"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  프로필수정
                </Link>
                <Link
                  to ="/Mypage"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  마이페이지
                </Link>
              </div>
              <div className="py-6">
              {isLoggedIn ? (
                  <Link
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    로그아웃
                  </Link>
                ) : (
                  <Link
                    to="/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default Header;