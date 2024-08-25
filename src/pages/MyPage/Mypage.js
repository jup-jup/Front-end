import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { posts } from 'components/dummydata/chat';
// import { useTodos } from '../hooks/useApi';

const tabs = [
  { name: '나눔내역', href: '#', current: false },
  { name: '받음내역', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('나눔내역');

  //react query test
  // const { data, isLoading, error, refetch } = useTodos({
  //   // 옵션 예시
  //   refetchInterval: 5000, // 5초마다 자동으로 다시 조회
  //   staleTime: 10000, // 10초 동안 데이터를 "신선"하다고 간주
  // });

  // if (isLoading) {
  //   return <div className='loading'>데이터를 불러오는 중...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className='error'>데이터를 불러오는 데 문제가 발생했습니다.</div>
  //   );
  // }

  // if (!data || data.data.length === 0) {
  //   return <div className='no-data'>표시할 데이터가 없습니다.</div>;
  // }

  return (
    //test data
    //   <div>
    //   <ul>
    //     {data?.data.map((post) => (
    //       <li key={post.id}>
    //         <h2>{post.email}</h2>
    //         {/* <p>{post.body}</p> */}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
      <div className='bg-white py-24 sm:py-12 mx-auto max-w-7xl w-[60%]'>
        <div>
          <div className='block'>
            <div className='border-b border-gray-200'>
              <nav aria-label='Tabs' className='flex -mb-px space-x-8'>
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab.name);
                    }}
                    aria-current={tab.current ? 'page' : undefined}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className='flex mt-12 mb-12'>
          <div className='mt-2 mx-auto w-[30rem] relative'>
            <input
              id='text'
              name='text'
              type='text'
              className='block w-full py-1.5 text-gray-900 border-b placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='검색어를 입력하세요.'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='absolute right-0 size-5 bottom-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </div>
        </div>

        {activeTab === '나눔내역' ? (
          <div className='px-6 mx-auto max-w-7xl lg:px-8'>
            <h3 className='text-lg font-semibold'>나눔내역</h3>
            <div className='max-w-2xl mx-auto lg:max-w-4xl'>
              {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p> */}
              <div className='mt-16 space-y-20 lg:mt-20 lg:space-y-20'>
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className='relative flex flex-col gap-8 isolate lg:flex-row'
                  >
                    <Link
                      to='/MypageGIVE'
                      className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0'
                    >
                      <img
                        alt=''
                        src={post.imageUrl}
                        className='absolute inset-0 object-cover w-full h-full rounded-2xl bg-gray-50'
                      />
                      <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                    </Link>
                    <div>
                      <Link
                        to='/MypageGIVE'
                        className='flex items-center text-xs gap-x-4'
                      >
                        <time
                          dateTime={post.datetime}
                          className='text-gray-500'
                        >
                          {post.date}
                        </time>
                        <a
                          href={post.category.href}
                          className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                        >
                          {post.category.title}
                        </a>
                      </Link>
                      <Link
                        to='/MypageGIVE'
                        className='relative max-w-xl group'
                      >
                        <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                          <span className='absolute inset-0' />
                          {post.title}
                        </h3>
                        <p className='mt-5 text-sm leading-6 text-gray-600'>
                          {post.description}
                        </p>
                      </Link>
                      <div className='flex pt-6 mt-6 border-t border-gray-900/5'>
                        <div className='relative flex items-center gap-x-4'>
                          {/* <img alt="" src={post.author.imageUrl} className="w-10 h-10 rounded-full bg-gray-50" /> */}
                          <div className='text-sm leading-6'>
                            <p className='font-semibold text-gray-900'>
                              <a href={post.author.href} className='flex'>
                                <span className='absolute inset-0' />
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeLinejoin='1.5'
                                  stroke='currentColor'
                                  className='size-6'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
                                  />
                                </svg>
                                {post.author.name}
                              </a>
                            </p>
                            <div className='flex'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='size-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                />
                              </svg>
                              <p className='text-gray-600'>
                                {post.author.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className='px-6 mx-auto max-w-7xl lg:px-8'>
              <h3 className='text-lg font-semibold'>받음내역</h3>
              <div className='max-w-2xl mx-auto lg:max-w-4xl'>
                {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p> */}
                <div className='mt-16 space-y-20 lg:mt-20 lg:space-y-20'>
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className='relative flex flex-col gap-8 isolate lg:flex-row'
                    >
                      <Link
                        to='/MypageReceive'
                        className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0'
                      >
                        <img
                          alt=''
                          src={post.imageUrl}
                          className='absolute inset-0 object-cover w-full h-full rounded-2xl bg-gray-50'
                        />
                        <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                      </Link>
                      <div>
                        <Link
                          to='/MypageReceive'
                          className='flex items-center text-xs gap-x-4'
                        >
                          <time
                            dateTime={post.datetime}
                            className='text-gray-500'
                          >
                            {post.date}
                          </time>
                          <a
                            href={post.category.href}
                            className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                          >
                            {post.category.title}
                          </a>
                        </Link>
                        <Link
                          to='/MypageReceive'
                          className='relative max-w-xl group'
                        >
                          <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                            <span className='absolute inset-0' />
                            {post.title}
                          </h3>
                          <p className='mt-5 text-sm leading-6 text-gray-600'>
                            {post.description}
                          </p>
                        </Link>
                        <div className='flex pt-6 mt-6 border-t border-gray-900/5'>
                          <div className='relative flex items-center gap-x-4'>
                            {/* <img alt="" src={post.author.imageUrl} className="w-10 h-10 rounded-full bg-gray-50" /> */}
                            <div className='text-sm leading-6'>
                              <p className='font-semibold text-gray-900'>
                                <a href={post.author.href} className='flex'>
                                  <span className='absolute inset-0' />
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeLinejoin='1.5'
                                    stroke='currentColor'
                                    className='size-6'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
                                    />
                                  </svg>
                                  {post.author.name}
                                </a>
                              </p>
                              <div className='flex'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeLinejoin='1.5'
                                  stroke='currentColor'
                                  className='size-6'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                                  />
                                </svg>
                                <p className='text-gray-600'>
                                  {post.author.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
