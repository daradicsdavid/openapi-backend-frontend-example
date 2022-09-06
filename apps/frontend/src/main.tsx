import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import {QueryClient} from "react-query";
import ApiProvider from "./app/api.provider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
root.render(
  <StrictMode>
    <BrowserRouter>
      <ApiProvider queryClient={queryClient}>
        <App />
      </ApiProvider>
    </BrowserRouter>
  </StrictMode>
);
