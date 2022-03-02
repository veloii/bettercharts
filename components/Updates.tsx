import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { useCookies } from "react-cookie";

const Updates = () => {
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  const [cookies, setCookie, removeCookie] = useCookies([
    "dismiss_update_banner",
  ]);

  useEffect(() => {
    if (open !== undefined)
      setCookie("dismiss_update_banner", !open, {
        secure: true,
      });
  }, [open]);

  useEffect(() => {
    setOpen(cookies.dismiss_update_banner !== "true");
  }, []);

  return null;
};

export default Updates;
