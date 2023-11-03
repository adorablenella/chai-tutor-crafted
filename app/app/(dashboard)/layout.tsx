import "@/styles/globals.css";
import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { Providers } from "@/app/app/(dashboard)/providers";
import { ChaiScripts } from "./scripts";
import { getUserLastTransaction } from "@/lib/actions";
import Script from "next/script";

export const dynamic = "force-dynamic";

function isProductionEnv() {
  return process.env.NODE_ENV === "production";
}
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const lastTransaction = await getUserLastTransaction();
  const canUpgrade = lastTransaction === null;
  return (
    <>
      <Providers>
        <div className="flex h-screen w-screen">
          <Nav canUpgrade={canUpgrade}>
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          </Nav>
          <div className="h-screen min-h-full flex-1 overflow-auto dark:bg-black ">{children}</div>
        </div>
      </Providers>
      <Script src="//unpkg.com/alpinejs" defer />
      <ChaiScripts />
    </>
  );
}
