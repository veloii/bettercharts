import Link from "next/link";

const FourZeroFour = () => {
  return (
    <div className="min-h-full px-4 py-16 bg-white dark:bg-gray-900 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-purple-600 sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 dark:sm:border-gray-700 sm:pl-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link href="/">
                <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm dark:text-black hover:bg-purple-700 focus:outline-none ">
                  Go back home
                </a>
              </Link>
              <a
                href="https://twitter.com/zelrdev"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-700 bg-gray-800 border border-transparent rounded-md dark:text-purple-500 hover:bg-gray-700 focus:outline-none "
              >
                Tweet @zelrdev
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FourZeroFour;
