import { ArrowRightIcon } from "@heroicons/react/solid";
import ScrollAnimation from "react-animate-on-scroll";

const logos = [
  {
    name: "React",
    url: "/react.png",
  },
  {
    name: "Vercel",
    url: "/vercel.png",
  },
  {
    name: "NextJS",
    url: "/nextjs.png",
  },
  {
    name: "Webpack",
    url: "/webpack.png",
  },
  {
    name: "TailwindCSS",
    url: "/tailwindcss.png",
  },
  {
    name: "TailwindUI",
    url: "/tailwindui.png",
  },
];

const LogoCloudSection = () => {
  return (
    <div className="mt-32">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div>
            <ScrollAnimation animateIn="fadeInDown">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Ensure speed and uptime.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInLeft">
              <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
                BetterCharts is powered by the latest web technologys, such as
                React and HTTP/2. Everything is hosted on Vercel with us
                monitoring page analytics to create a fast experience.
              </p>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp">
              <div className="mt-6">
                <a
                  href="https://github.com/ZelrDev/bettercharts"
                  className="text-base font-medium text-emerald-500 flex gap-2"
                >
                  View all the source code <ArrowRightIcon className="w-5" />
                </a>
              </div>
            </ScrollAnimation>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
            {logos.map((logo, logoIdx) => (
              <ScrollAnimation animateIn="fadeIn" delay={logoIdx}>
                <div
                  key={logo.name}
                  className="col-span-1 flex justify-center py-8 px-8 bg-gray-50"
                >
                  <img className="max-h-12" src={logo.url} alt={logo.name} />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloudSection;
