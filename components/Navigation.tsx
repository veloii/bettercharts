import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "/", condition: ["===", "/"] },
  { name: "Status", href: "https://status.zelr.me", condition: null },
];

const Navigation = () => {
  const [classes, setClasses] = useState<string | boolean>("");
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", changeSticky);
    return () => {
      window.removeEventListener("scroll", changeSticky);
    };
  });

  const changeSticky = (e: any) => {
    const scrollTop = window.scrollY;
    scrollTop >= 100 ? setClasses("in-down fixed") : setClasses("");
  };

  const linkCondition = (condition: string[] | null) => {
    if (condition === null) return false;
    if (condition[0] === "includes")
      return router.asPath.includes(condition[1]);
    if (condition[0] === "===") return router.asPath === condition[1];
  };

  return (
    <div className={`text-white bg-black z-50 w-full pb-2 pt-1 ${classes} md:px-0 px-2`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h4 className="text-4xl">zelr</h4>
        </div>

        <div className="flex gap-4 font-mono cursor-pointer">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className={linkCondition(link.condition) ? "underline" : ""}>
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
