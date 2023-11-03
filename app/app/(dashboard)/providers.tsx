"use client";

import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster className="dark:hidden" richColors closeButton offset={16} />
      <Toaster theme="dark" className="hidden dark:block" richColors closeButton offset={16} />
      <ModalProvider>{children}</ModalProvider>
    </>
  );
}
