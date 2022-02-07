import Link from "next/link";

export default function Button(props: {
  text?: string;
  link?: string;
  onClick?: Function;
  classes?: string;
  size: "1" | "2" | "3" | "4" | "5";
  children?: any;
}) {
  return (
    <>
      {props.size === "1" &&
        (props?.link ? (
          <Link href={props.link}>
            <button
              type="button"
              onClick={(val: any) => props.onClick && props.onClick(val)}
              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
            >
              {props.children}
              {props.text}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={(val: any) => props.onClick && props.onClick(val)}
            className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
          >
            {props.children}
            {props.text}
          </button>
        ))}
      {props.size === "2" &&
        (props?.link ? (
          <Link href={props.link}>
            <button
              type="button"
              onClick={(val: any) => props.onClick && props.onClick(val)}
              className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
            >
              {props.children}
              {props.text}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={(val: any) => props.onClick && props.onClick(val)}
            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
          >
            {props.children}
            {props.text}
          </button>
        ))}
      {props.size === "3" &&
        (props?.link ? (
          <Link href={props.link}>
            <button
              type="button"
              onClick={(val: any) => props.onClick && props.onClick(val)}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
            >
              {props.children}
              {props.text}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={(val: any) => props.onClick && props.onClick(val)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
          >
            {props.children}
            {props.text}
          </button>
        ))}
      {props.size === "4" &&
        (props?.link ? (
          <Link href={props.link}>
            <button
              type="button"
              onClick={(val: any) => props.onClick && props.onClick(val)}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
            >
              {props.children}
              {props.text}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={(val: any) => props.onClick && props.onClick(val)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
          >
            {props.children}
            {props.text}
          </button>
        ))}
      {props.size === "5" &&
        (props?.link ? (
          <Link href={props.link}>
            <button
              type="button"
              onClick={(val: any) => props.onClick && props.onClick(val)}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
            >
              {props.children}
              {props.text}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={(val: any) => props.onClick && props.onClick(val)}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${props?.classes}`}
          >
            {props.children}
            {props.text}
          </button>
        ))}
    </>
  );
}
