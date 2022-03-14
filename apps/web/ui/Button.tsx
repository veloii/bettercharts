import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

const sizeClassnames = {
  "1": "px-2.5 py-1.5 text-xs rounded",
  "2": "px-3 py-2 text-sm leading-4 rounded-md",
  "3": "px-4 py-2 text-sm rounded-md",
  "4": "px-4 py-2 text-base rounded-md",
  "5": "px-6 py-3 text-base rounded-md",
};

const colorClassnames = {
  primary:
    "shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 border border-transparent",
  secondary:
    "text-emerald-700 bg-emerald-100 hover:bg-emerald-200 border border-transparent",
  white:
    "border border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  icon?: ReactNode;
  transition?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  size = "2",
  color = "primary",
  icon,
  className = "",
  transition,
  ...props
}) => {
  return (
    <button
      className={`${sizeClassnames[size]} ${
        transition ? `transition duration-200 ease-in-out` : ``
      } ${
        colorClassnames[color]
      } focus:outline-none inline-flex items-center font-medium ${className}`}
      data-testid="button"
      {...props}
    >
      {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
      {children}
    </button>
  );
};

export default Button;
