import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SiteSettingsHead from "./nav";

export default async function SiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const session = await getSession();
  if (!session) redirect("/login");

  const { data = {} } = await supabase.from("projects").select("*").eq("uuid", params.id).single();

  if (!data) return notFound();

  return (
    <>
      <SiteSettingsHead data={data} />
      {children}
    </>
  );
}
