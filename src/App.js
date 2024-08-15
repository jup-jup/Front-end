const posts = [
  {
    id: 1,
    title: '당신의 물건, 누군가의 보물. 줍줍에서 나누고 채우세요.',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl: '/main/maude.jpg',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: '이사 전 대청소, 걱정 끝! 줍줍으로 쉽고 의미 있게 정리하세요.',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl: '/main/hiveboxx.jpg',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title:
      '버리기엔 아깝고, 팔기엔 귀찮은 물건들. 줍줍에서 새 주인을 만나세요.',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl: '/main/clay.jpg',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
];

export default function Example() {
  return (
    <>
      <div className='relative bg-[#A4C9DB] sm:h-[57rem]'>
        <div className='mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8'>
          <div className='px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <h1 className='mt-24 text-4xl font-bold tracking-tight text-white sm:mt-10 sm:text-6xl'>
                미니멀 라이프 <br /> 줍줍과 시작해요
              </h1>
              <p className='mt-6 text-lg leading-8 text-white break-keep'>
                물건은 많은데 정작 필요한 건 없나요? 버리기는 아깝고, 팔기는
                귀찮은 그 물건들, 어떻게 해야 할지 고민되나요? 줍줍이 해답을
                드립니다. 나누고, 정리하고, 미니멀 라이프를 경험해보세요.
              </p>
            </div>
            <div className='mt-10 flex items-center gap-x-6'>
              <a
                href='#'
                className='rounded-md bg-[#4EC0DE] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4EC0DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Get started
              </a>
            </div>
          </div>
          <div className='relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0'>
            <img
              alt=''
              src={'/main/diego.jpg'}
              className='aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full h-[30rem]'
            />
          </div>
        </div>
      </div>
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto px-2 lg:px-52'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              나눔의 새로운 방식
            </h2>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              물건은 줄이고, 행복은 늘리고
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {posts.map((post) => (
              <article
                key={post.id}
                className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80'
              >
                <img
                  alt=''
                  src={post.imageUrl}
                  className='absolute inset-0 -z-10 h-full w-full object-cover'
                />
                <div className='absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40' />
                <div className='absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                <h3 className='mt-3 text-lg font-semibold leading-6 text-white break-keep text-center'>
                  <a href={post.href}>
                    <span className='absolute inset-0' />
                    {post.title}
                  </a>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className='relative bg-white sm:h-[50rem] mt-40'>
        <img
          alt=''
          src='/main/dan.jpg'
          className='h-56 w-full bg-gray-50 object-cover lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2'
        />
        <div className='mx-auto grid max-w-7xl lg:grid-cols-2'>
          <div className='px-6 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-32'>
            <div className='mx-auto max-w-2xl lg:mr-0 lg:max-w-lg'>
              <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl break-keep'>
                줍줍은 단순한 나눔 플랫폼이 아닙니다.
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-600 break-keep'>
                물건을 나누고, 환경을 생각하고, 새로운 인연을 만드는 모든 과정을
                줍줍과 함께 경험해보세요.
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-600 break-keep'>
                집 안 가득 쌓인 물건들로 고민이신가요? 줍줍이 해결해드립니다.
                나눔을 통해 공간을 정리하고, 미니멀한 라이프스타일을 실천하며,
                동시에 환경 보호에 기여할 수 있습니다. 지금 바로 줍줍과 함께
                새로운 라이프스타일을 시작해보세요.
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-600 break-keep'>
                줍줍은 당신의 일상을 변화시킵니다. 더 이상 필요 없는 물건들을
                쉽고 빠르게 나누고, 미니멀 라이프 챌린지에 참여하며, 새로운
                커뮤니티를 만나보세요. 줍줍과 함께라면, 정리는 더 이상 힘든 일이
                아닙니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='relative bg-white h-[50rem] mt-40 mb-40 sm:grid sm:grid-cols-2'>
        <div className=''>
          <div className='px-6 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-32'>
            <div className='mx-auto max-w-2xl lg:mr-0 lg:max-w-lg'>
              <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl break-keep'>
                당신의 나눔이 만드는 지속 가능한 미래
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-600 break-keep'>
                매년 수백만 톤의 물건들이 쓰레기로 버려집니다. <br></br>하지만
                당신의 작은 실천이 이를 바꿀 수 있습니다. 줍줍에서 나눔을
                실천하고, 환경을 지키는 첫 걸음을 내딛어보세요. 당신의 나눔이
                지구를 웃게 만듭니다.
              </p>
            </div>
          </div>
        </div>
        <img
          alt=''
          src='/main/maria.jpg'
          className='h-56 w-full bg-gray-50 object-cover lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2'
        />
      </div>
    </>
  );
}
