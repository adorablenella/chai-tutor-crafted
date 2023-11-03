import "@/styles/globals.css";
import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { Providers } from "@/app/app/(dashboard)/providers";
import { ChaiScripts } from "./scripts";
import { getUserLastTransaction } from "@/lib/actions";
import Script from "next/script";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const lastTransaction = await getUserLastTransaction();
  const session = await getSession();
  const canUpgrade = lastTransaction === null;
  const globalData = `{
    name: '${session?.user?.user_metadata?.name}',
    email: '${session?.user?.email}',
  }`;
  return (
    <>
      <Providers>
        <div {...{ "x-data": globalData }} className="flex h-screen w-screen">
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
