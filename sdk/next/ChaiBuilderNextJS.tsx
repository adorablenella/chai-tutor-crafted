"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootChaiStudio from "./RootChaiStudio";
import { Provider } from "jotai";
import { builderStore } from "@/sdk/package/store";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function ChaiBuilderNextJS() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={builderStore}>
        <RootChaiStudio />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
