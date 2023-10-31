import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SiteAnalyticsLayout({ children }: { params: { id: string }; children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return <>{children}</>;
}
