import { createContext } from "react";
import ClassCharts from "../types/ClassCharts";
import fakeUser from "lib/fakeUser";

export type UserContextType = {
  user?: ClassCharts | null | undefined;
  setUser: Function;
};

export const UserContext = createContext<UserContextType>({
  user: fakeUser,
  setUser: () => {},
});

export const UserContextProvider = UserContext.Provider;
