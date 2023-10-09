import * as React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { rootRouter } from "./routers";
import { GlobalStyle } from "./styles";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <RouterProvider router={rootRouter}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
