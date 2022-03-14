import { useCookies } from "react-cookie";
import Button from "ui/Button";

const CookieConsent = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "dismiss_cookie_banner",
  ]);

  const dismissBanner = () => {
    setCookie("dismiss_cookie_banner", "yes");
  };

  return cookies?.dismiss_cookie_banner !== "yes" ? (
    <div className="fixed bottom-0 z-50 items-center justify-center w-full gap-5 p-2 space-y-2 border-b bg-emerald-200 dark:text-white dark:bg-emerald-900 lg:flex lg:space-y-0 dark:border-b-gray-700">
      <div className="text-sm">
        By using this website, you agree that we may set cookies for purposes
        such as remembering your session.
      </div>

      <Button size="1" onClick={dismissBanner}>
        I understand
      </Button>
    </div>
  ) : (
    <div></div>
  );
};

export default CookieConsent;
