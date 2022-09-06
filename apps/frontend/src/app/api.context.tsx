import { createContext } from "react";
import { AxiosInstance } from "axios";

export const ApiContext = createContext<AxiosInstance>({} as AxiosInstance);
