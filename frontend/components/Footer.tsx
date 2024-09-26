import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className='bg-white z-50 text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3'>
      <div className="flex flex-row">
        <Image
            alt='header text'
            src='/icon128.png'
            className='w-4 h-4 mt-[2px] mr-1'
            width={8}
            height={8}
        />
        <span className="text-sm text-gray-500">© 2024 NextRole</span>
      </div>
      <div className='flex space-x-4 pb-4 sm:pb-0'>

        <Link
          href='/terms'
          className='group'
          aria-label='Terms of Service'
        >
          <span className="text-sm text-gray-500">Terms</span>
        </Link>
        <Link
            href='/privacy'
            className='group'
            aria-label='Privacy Policy'
        >
          <span className="text-sm text-gray-500">Privacy</span>
        </Link>
      </div>
    </footer>
  );
}
