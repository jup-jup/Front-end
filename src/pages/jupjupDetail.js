import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: '맥북에어 나눔합니다.',
    href: '#',
    state: '예약중',
    description: '블라블라 설명',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: '2024.07.11',
    datetime: '2020-03-16',
    category: { title: '인현동', href: '#' },
    author: {
      name: '11',
      role: '20',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
];

export default function Example() {
  const [isFilled, setIsFilled] = useState(false);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };
  return (
    <div className='bg-white py-2 sm:py-12 mx-auto max-w-7xl w-full'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-4xl'>
          {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p> */}
          <div className='mt-16 space-y-20 lg:mt-20 lg:space-y-20'>
            {posts.map((post) => (
              <article key={post.id} className='relative isolate gap-8'>
                <div className='flex gap-4'>
                  <div className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0'>
                    <img
                      alt=''
                      src={post.imageUrl}
                      className='absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover'
                    />
                    <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                    {/* 슬라이드 이미지 들어가는 자리 */}
                  </div>
                  <div className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0'>
                    <img
                      alt=''
                      src={post.imageUrl}
                      className='absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover'
                    />
                    <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                    {/* 슬라이드 이미지 들어가는 자리 */}
                  </div>
                  <div className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0'>
                    <img
                      alt=''
                      src={post.imageUrl}
                      className='absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover'
                    />
                    <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                    {/* 슬라이드 이미지 들어가는 자리 */}
                  </div>
                </div>
                <div className='mt-12'>
                  <div className='flex items-center gap-x-4 text-xs'>
                    <time dateTime={post.datetime} className='text-gray-500'>
                      {post.date}
                    </time>
                    <a
                      href={post.category.href}
                      className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                    >
                      {post.category.title}
                    </a>

                    <div onClick={toggleHeart} className='flex'>
                      {!isFilled ? (
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
                            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='size-6'
                        >
                          <path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
                        </svg>
                      )}
                      <span className='text-base'>찜</span>
                    </div>
                  </div>
                  <div className='group relative max-w-xl'>
                    <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                      <a href={post.href}>
                        <span className='absolute inset-0' />
                        {post.title}
                      </a>
                    </h3>
                  </div>
                  <p className='mt-5 text-sm leading-6 text-gray-600'>
                    {post.state}
                  </p>
                  <p className='mt-5 text-sm leading-6 text-gray-600'>
                    {post.description}
                  </p>
                  <div className='mt-6 flex border-t border-gray-900/5 pt-6'>
                    <div className='relative flex items-center gap-x-4'>
                      {/* <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" /> */}
                      <div className='text-sm leading-6'>
                        <p className='font-semibold text-gray-900'>
                          <a href={post.author.href} className='flex'>
                            <span className='absolute inset-0' />
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
                          <p className='text-gray-600'>{post.author.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className='mt-10 flex items-center gap-x-6'>
              <Link
                to='/chat'
                href='#'
                className='rounded-md bg-[#4EC0DE] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                채팅하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
