import { createContext } from "react";
import { Socket } from "socket.io-client";

export type SocketContextType = {
  socket?: Socket | null;
  setSocket: Function;
};

export const SocketContext = createContext<SocketContextType>({
  socket: undefined,
  setSocket: () => {},
});

export const SocketContextProvider = SocketContext.Provider;
