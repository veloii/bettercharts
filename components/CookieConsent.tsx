import { useCookies } from "react-cookie";

const CookieConsent = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "dismiss_cookie_banner",
  ]);

  const dismissBanner = () => {
    setCookie("dismiss_cookie_banner", "yes");
  };

  return cookies?.dismiss_cookie_banner !== "yes" ? (
    <div className="fixed bottom-0 z-50 justify-center w-full gap-5 p-2 space-y-2 bg-white border-b bg-opacity-80 dark:bg-opacity-80 dark:text-white dark:bg-gray-900 lg:flex lg:space-y-0 dark:border-b-gray-700">
      <div className="text-sm">
        By using this website, you agree that we may set cookies for purposes
        such as remembering your session.
      </div>
      <button
        onClick={dismissBanner}
        className="flex items-center justify-center px-3 text-xs bg-purple-700 border-2 rounded-full shadow dark:border-purple-600"
      >
        I understand
      </button>
    </div>
  ) : (
    <div></div>
  );
};

export default CookieConsent;
