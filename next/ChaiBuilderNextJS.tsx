"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { TbLoader } from "react-icons/tb";
import { useUser, verifyUser } from "./hooks/useUser";
import RootChaiStudio from "./RootChaiStudio";
import Logo from "./previews/Logo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// eslint-disable-next-line react/display-name
export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useUser();

  useEffect(() => {
    (async () => {
      const response = await verifyUser();
      setUser(response);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-x-2">
        <Logo />
        <TbLoader className="-mt-0.5 animate-spin text-gray-700" size={20} />
      </div>
    );
  // if (!user) return <Login />;

  return (
    <QueryClientProvider client={queryClient}>
      <RootChaiStudio />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
