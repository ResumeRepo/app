import Link from "next/link";

const AddToChromeButton = ({hidden = false}: {hidden?: boolean }) => {
  let className = "py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
  if (hidden) {
    className = "hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
  }

  return (
          <Link
              href="#"
              className={'w-full ' + className}
              target="_blank"
          >
            <div className="text-center w-full flex flex-row">
              <button type="button" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <img
                    alt='Chrome'
                    src='/chrome.svg'
                    className='w-5 h-5 mr-2'
                    width={20}
                    height={20}
                />
                <span className="text-md font-extrabold text-white">Add to Chrome</span>
              </button>
            </div>
          </Link>
  );
};

export default AddToChromeButton;
