import { Link } from 'react-router-dom';
  
  export default function Example() {
    return (
      <div className="bg-white py-24 sm:py-32 relative mx-auto max-w-7xl">
          <div className="mt-10 mb-12">
              <Link to ="/beforAftertUpload"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                글올리기
              </Link>
          </div>
          <p></p>

          <div className='mb-12'>
            <select
              id="location"
              name="location"
              defaultValue="Canada"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>인기순</option>
              <option>최신순</option>
            </select>
         </div>
        
        <h1>#요즘 스타일로 제정비</h1>
        <div className="flex">
          <p>블라블라 설명</p>
          <p>></p>
        </div>
        <div class="flex gap-4">
          <Link to ="/beforAftertDetail" className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">BEFORE</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </Link>
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">AFTER</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
        </div>

        <h1 className="mt-12">#거의 다 나눔</h1>
        <div className="flex">
          <p>블라블라 설명</p>
          <p>></p>
        </div>
        <div class="flex gap-4">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">BEFORE</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">AFTER</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
        </div>

        <h1 className="mt-12">#꺠끗</h1>
        <div className="flex">
          <p>블라블라 설명</p>
          <p>></p>
        </div>
      </div>
    )
  }
  