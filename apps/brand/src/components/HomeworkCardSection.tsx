import ScrollAnimation from "react-animate-on-scroll";

const HomeworkCardSection = () => {
  return (
    <div className="relative mt-20">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <ScrollAnimation animateIn="fadeInUp">
          <div className="relative sm:py-16 lg:py-0">
            <div
              aria-hidden="true"
              className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
            >
              <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
              <svg
                className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
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
                  fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-xs lg:py-20">
              <div className="relative rounded-2xl shadow-xl overflow-hidden">
                <ScrollAnimation animateIn="fadeInDown">
                  <img src="/homework.png" alt="" />
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <ScrollAnimation  animateIn="fadeInRight">
              <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                On a mission to make homework easier
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp">
              <div className="mt-6 text-gray-500 space-y-6">
                <p className="text-lg">See it, view it, complete it.</p>
                <p className="text-base leading-7">
                  See all the homework that you have for that week on the
                  bettercharts dashboard page.
                </p>
                <p className="text-base leading-7">
                  Know what homework is due for what week in one page. View any
                  notes the teachers has provided or any attachments with one
                  click. Tick the homework in one click.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkCardSection;
