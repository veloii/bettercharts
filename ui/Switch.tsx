import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import classNames from "../lib/classNames";

export default function SwitchWithRightLabel(props: {
  text: string;
  defaultCheck: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  const [enabled, setEnabled] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (enabled !== undefined) props.onChange(enabled);
  }, [enabled]);

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled === undefined ? props.defaultCheck : enabled}
        onChange={setEnabled}
        disabled={props.disabled}
        className={classNames(
          (enabled === undefined ? props.defaultCheck : enabled)
            ? "bg-purple-600"
            : "bg-gray-200 dark:bg-gray-800",
          `relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900 ${
            props.disabled && "opacity-40 cursor-not-allowed"
          }`
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            (enabled === undefined ? props.defaultCheck : enabled)
              ? "translate-x-5"
              : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-900 border dark:border-gray-700 transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {props.text}
        </span>
      </Switch.Label>
    </Switch.Group>
  );
}
