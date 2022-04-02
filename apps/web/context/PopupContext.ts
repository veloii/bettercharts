import { createContext } from "react";
import Popup from "../types/Popup";

export type PopupContextType = {
  popup?: Popup | null;
  setPopup: Function;
};

export const PopupContext = createContext<PopupContextType>({
  popup: undefined,
  setPopup: () => {},
});

export const PopupContextProvider = PopupContext.Provider;
