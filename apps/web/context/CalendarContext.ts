import { createContext } from "react";
import Calendar from "../types/Calendar";

export type CalendarContextType = {
  calendar?: Calendar | null;
  setCalendar: Function;
};

export const CalendarContext = createContext<CalendarContextType>({
  calendar: undefined,
  setCalendar: () => {},
});

export const CalendarContextProvider = CalendarContext.Provider;
