import {
  Fragment,
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import classNames from "lib/classNames";

export default function SimpleSelect(props: {
  label?: string;
  data: {
    id: string;
    name: string;
  }[];
  onChange?: (value: { id: string; name: string }) => void;
  defaultIndex: number;
}) {
  const [selected, setSelected] = useState(props.data[props.defaultIndex]);

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        props.onChange && props.onChange(value);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {props.label}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white dark:bg-gray-900 relative w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {props.data.map((data) => (
                  <Listbox.Option
                    key={data.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white dark:text-black bg-emerald-600"
                          : "text-gray-900 dark:text-gray-50",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {data.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active
                                ? "text-white dark:text-black"
                                : "text-emerald-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
