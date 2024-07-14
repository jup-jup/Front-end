import { Link } from 'react-router-dom';
  
  export default function Example() {
    return (
      <div className="bg-white py-24 sm:py-32 relative mx-auto max-w-7xl">
        <div className="mt-10 mb-12">
              <Link to ="/beforAftertDetail"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                글올리기
              </Link>
          </div>

        <p>실시간 BeforeAfter</p>
        <h1>#요즘 스타일로 제정비</h1>
        <div className="flex">
          <p>블라블라 설명</p>
          <p>></p>
        </div>
        <div class="flex gap-4">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">BEFORE</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">AFTER</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
        </div>

        <h1 className="mt-12">#거의 다 나눔</h1>
        <div className="flex">
          <p>블라블라 설명</p>
          <p>></p>
        </div>
        <div class="flex gap-4">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">BEFORE</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">AFTER</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
        </div>

        <h1 className="mt-12">#꺠끗</h1>
        <div className="flex">
          <p>블라블라 설명</p>
          <p>></p>
        </div>
        <div class="flex gap-4">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">BEFORE</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <img
              alt=""
              src={'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="absolute text-white left-4 top-4">AFTER</p>
            {/* 슬라이드 이미지 들어가는 자리 */}
          </div>
        </div>
      </div>
    )
  }
  