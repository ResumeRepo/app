import Image from 'next/image';
import Link from 'next/link';

export default function Header({ photo }: { photo?: string | undefined }) {
  return (
    <header className='w-full sm:px-4 px-2 top-0 sticky bg-white z-50 h-14'>
      <div className="pt-5 pb-3 flex justify-between items-center bg-white">
      <Link href='/' className='flex space-x-2'>
        <Image
          alt='NextRole Logo'
          src='/icon128.png'
          className='sm:w-6 sm:h-6 w-6 h-6 mt-1'
          width={16}
          height={16}
        />
        <h1 className='sm:text-2xl text-xl font-bold ml-2 pt-[2px] tracking-tight'>
          NextRole
        </h1>
      </Link>
      {photo ? (
        <Image
          alt='Profile picture'
          src={photo}
          className='w-10 rounded-full'
          width={32}
          height={28}
        />
      ) : (
        <div className='flex space-x-6'>
          <Link
            href='/'
            className='pr-4 space-x-2 hover:text-blue-400 transition hidden sm:flex'
            // className='border-r border-gray-300 pr-4 space-x-2 hover:text-blue-400 transition hidden sm:flex'
          >
            <p className='font-medium text-base'>Home</p>
          </Link>
          {/*<Link*/}
          {/*  href='/restore'*/}
          {/*  className='border-gray-300 pr-4 space-x-2 hover:text-blue-400 transition hidden sm:flex'*/}
          {/*>*/}
          {/*  <p className='font-medium text-base'>Restore</p>*/}
          {/*</Link>*/}
        </div>
      )}
      </div>
    </header>
  );
}
