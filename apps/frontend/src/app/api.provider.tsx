import {PropsWithChildren, useMemo} from "react";
import axios from "axios";
import {QueryClient} from "react-query";
import {ApiContext} from "./api.context";

interface AxiosProviderProps {
  queryClient: QueryClient;
}

export default function ApiProvider(
  props: PropsWithChildren<AxiosProviderProps>
) {
  const api = useMemo(() => {

    const axiosClient = axios.create({
      headers: {
        "Content-Type": "application/json"
      }
    });

    axiosClient.interceptors.response.use(
      function (response) {
        handleDates(response.data);
        return response;
      },
      (error) => {
        // eslint-disable-next-line no-constant-condition
        return Promise.reject(error);
      }
    );
    return axiosClient;
  }, [props.queryClient]);

  return (
    <ApiContext.Provider value={api}> {props.children} </ApiContext.Provider>
  );
}

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = new Date(value);
    else if (typeof value === "object") handleDates(value);
  }
}
