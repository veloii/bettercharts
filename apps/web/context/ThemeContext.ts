import { createContext } from "react";
import Theme from "../types/Theme";

export type ThemeContextType = {
  theme?: Theme | null;
  setTheme: Function;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: undefined,
  setTheme: () => {},
});

export const ThemeContextProvider = ThemeContext.Provider;
