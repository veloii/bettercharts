import { SVGProps } from "react";

export default interface Theme {
  desktopNavigation: desktopNavigation[];
}

export interface desktopNavigation {
  name: string;
  items: {
    name: string;
    description: string;
    href: string;
    info: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
}
