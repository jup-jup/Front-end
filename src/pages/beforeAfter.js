import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Example() {
  const [isFilled, setIsFilled] = useState(false);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div className='bg-white py-2 sm:py-12 relative mx-auto max-w-7xl'>
      <div className='mt-10 mb-12'>
        <Link
          to='/beforAftertUpload'
          className='rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          글올리기
        </Link>
      </div>
      <p></p>

      <div className='mb-12'>
        <select
          id='location'
          name='location'
          defaultValue='Canada'
          className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
        >
          <option>인기순</option>
          <option>최신순</option>
        </select>
      </div>

      <h1>#요즘 스타일로 제정비</h1>
      <div className='flex'>
        <p>블라블라 설명</p>
        <p></p>
      </div>
      <div className='flex gap-4'>
        <Link
          to='/beforAftertDetail'
          className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0'
        >
          <img
            alt=''
            src={
              'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'
            }
            className='absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover'
          />
          <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
          <p className='absolute text-white left-4 top-4'>BEFORE</p>
          {/* 슬라이드 이미지 들어가는 자리 */}
        </Link>
        <div className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0'>
          <img
            alt=''
            src={
              'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'
            }
            className='absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover'
          />
          <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
          <p className='absolute text-white left-4 top-4'>AFTER</p>
          {/* 슬라이드 이미지 들어가는 자리 */}
        </div>

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
    </div>
  );
}
