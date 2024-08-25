import { posts } from 'components/dummydata/chat';
import { Link } from 'react-router-dom';

export default function MypageGive() {
  return (
    <div className='py-24 mx-auto bg-white sm:py-12 max-w-7xl'>
      <div className='px-6 mx-auto max-w-7xl lg:px-8'>
        <div className='max-w-2xl mx-auto lg:max-w-4xl'>
          {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p> */}
          <div className='mt-16 space-y-20 lg:mt-20 lg:space-y-20'>
            {posts.map((post) => (
              <article key={post.id} className='relative gap-8 isolate'>
                <div className='flex gap-4'>
                  <div className='relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0'>
                    <img
                      alt=''
                      src={post.imageUrl}
                      className='absolute inset-0 object-cover w-full h-full rounded-2xl bg-gray-50'
                    />
                    <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                    {/* 슬라이드 이미지 들어가는 자리 */}
                  </div>
                </div>
                <div>
                  <div className='flex items-center text-xs gap-x-4'>
                    <time dateTime={post.datetime} className='text-gray-500'>
                      {post.date}
                    </time>
                    <a
                      href={post.category.href}
                      className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                    >
                      {post.category.title}
                    </a>
                  </div>
                  <div className='relative max-w-xl group'>
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
            <div className='flex items-center mt-10 gap-x-6'>
              <Link
                to='/chatOtherDetail'
                href='#'
                className='rounded-md bg-[#4EC0DE] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                대화중인 채팅 방
              </Link>
              <Link
                to='/jupjupUpdate'
                href='#'
                className='rounded-md bg-[#4EC0DE] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                수정하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
