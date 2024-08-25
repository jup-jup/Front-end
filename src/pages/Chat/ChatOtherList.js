import { people } from 'components/dummydata/chat';
import { Link } from 'react-router-dom';

export default function ChatOtherList() {
  return (
    <ul className='mx-auto divide-y divide-gray-100 max-w-7xl'>
      <Link to='/chatOtherDetail'>
        {people.map((person) => (
          <li key={person.email} className='flex justify-between py-5 gap-x-6'>
            <div className='flex min-w-0 gap-x-4'>
              <img
                alt=''
                src={person.imageUrl}
                className='flex-none w-12 h-12 rounded-full bg-gray-50'
              />
              <div className='flex-auto min-w-0'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {person.name}
                </p>
              </div>
            </div>
            <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
              <p className='text-sm leading-6 text-gray-900'>{person.role}</p>
              {person.lastSeen ? (
                <p className='mt-1 text-xs leading-5 text-gray-500'>
                  Last seen{' '}
                  <time dateTime={person.lastSeenDateTime}>
                    {person.lastSeen}
                  </time>
                </p>
              ) : (
                <div className='mt-1 flex items-center gap-x-1.5'>
                  <div className='flex-none p-1 rounded-full bg-emerald-500/20'>
                    <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                  </div>
                  <p className='text-xs leading-5 text-gray-500'>Online</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </Link>
    </ul>
  );
}
