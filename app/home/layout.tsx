import "@/styles/site.css";
import "@/custom-blocks";
import { ReactNode } from "react";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
