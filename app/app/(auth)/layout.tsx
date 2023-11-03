import "@/styles/globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import { ChaiScripts } from "@/app/app/(dashboard)/scripts";

export const metadata: Metadata = {
  title: "Login | Chai Builder",
};

function isProductionEnv() {
  return process.env.NODE_ENV === "production";
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="dark flex min-h-screen flex-col justify-center bg-background py-12 text-foreground sm:px-6 lg:px-8">
        {children}
      </div>
      <ChaiScripts />
    </>
  );
}
