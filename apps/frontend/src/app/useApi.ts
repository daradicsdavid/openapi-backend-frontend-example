import {useContext} from 'react';
import {ApiContext} from "./api.context";

export function useApi() {
  return useContext(ApiContext);
}
