import { useCookies } from "react-cookie";

const CookieConsent = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "dismiss_cookie_banner",
  ]);

  const dismissBanner = () => {
    setCookie("dismiss_cookie_banner", "yes");
  };

  return cookies?.dismiss_cookie_banner !== "yes" ? (
    <div className="fixed bottom-0 w-full bg-opacity-80 dark:bg-opacity-80 bg-white gap-5 dark:text-white dark:bg-gray-900 p-2 lg:flex lg:space-y-0 space-y-2 justify-center border-b dark:border-b-gray-700 z-50">
      <div className="text-sm">
        By using this website, you agree that we may set cookies for purposes
        such as remembering your session.
      </div>
      <button
        onClick={dismissBanner}
        className="bg-purple-700 shadow px-3 rounded-full text-xs flex justify-center items-center border-2 dark:border-purple-600"
      >
        I understand
      </button>
    </div>
  ) : (
    <div></div>
  );
};

export default CookieConsent;
