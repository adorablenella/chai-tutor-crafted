import "@/styles/globals.css";
import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { Providers } from "@/app/app/(dashboard)/providers";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="flex h-screen w-screen">
        <Nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        </Nav>
        <div className="h-screen min-h-full flex-1 overflow-auto dark:bg-black ">{children}</div>
      </div>
    </Providers>
  );
}
