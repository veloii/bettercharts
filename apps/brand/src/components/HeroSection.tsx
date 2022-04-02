import {
  BanIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChevronRightIcon,
  ClockIcon,
  HomeIcon,
} from "@heroicons/react/solid";

const HeroSection = () => {
  return (
    <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
      <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
        <div>
          <div className="w-auto -mb-10 text-5xl leading-3 text-emerald-600 font-brand h-11">
            bettercharts
          </div>

          <div className="mt-20">
            <div>
              <a
                href="https://github.com/ZelrDev/bettercharts"
                className="inline-flex space-x-4"
              >
                <span className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-500 tracking-wide uppercase">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-1 text-sm font-medium text-emerald-500">
                  <span>Just shipped version 0.9.2</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              </a>
            </div>
            <div className="mt-6 sm:max-w-xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                ClassCharts just got better!
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                Introducing the BetterCharts Dashboard. Everything in one place.
                No registering new accounts.
              </p>
            </div>
            <div className="gap-2 mt-12 sm:max-w-lg sm:w-full sm:flex">
              <a href="https://app.bettercharts.zelr.me/login">
                <button
                  type="submit"
                  className="block w-full px-5 py-3 text-base font-medium text-white border border-transparent rounded-md shadow bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-10"
                >
                  Enter BetterCharts
                </button>
              </a>
              <a href="https://www.youtube.com/watch?v=ZHjpj4AmzfM">
                <button
                  type="submit"
                  className="block w-full px-5 py-3 text-base font-medium text-white border border-transparent rounded-md shadow bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-10"
                >
                  Watch video
                </button>
              </a>
            </div>
            <div className="mt-6">
              <div className="inline-flex items-center divide-x divide-gray-300">
                <div className="flex flex-shrink-0 gap-2 pr-5">
                  <HomeIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <ChartBarIcon
                    className="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                  />
                  <BanIcon
                    className="w-5 h-5 text-red-400"
                    aria-hidden="true"
                  />
                  <ChartPieIcon
                    className="w-5 h-5 text-green-400"
                    aria-hidden="true"
                  />
                  <ClockIcon
                    className="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex-1 min-w-0 py-1 pl-5 text-sm text-gray-500 sm:py-3">
                  <span className="font-medium text-gray-900">Supports </span>
                  <span className="font-medium text-emerald-500">
                    homework, timetables, announcements, detentions, activity,
                    behaviour, awards
                  </span>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                This applications trys to improve the student dashboard for
                classcharts. This is NOT a classcharts alternative.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
        <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="hidden sm:block">
            <div className="absolute inset-y-0 w-screen left-1/2 bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
            <svg
              className="absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
              />
            </svg>
          </div>
          <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
            <img
              className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
              src="/better-charts-screenshot.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
