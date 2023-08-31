import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SiteCard from "./site-card";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Sites({ limit }: { limit?: number }) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();
  if (!session) redirect("/login");

  const { data: sites = [] } = await supabase.from("projects").select("*");

  return sites && sites.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {sites.map((site) => (
        <SiteCard key={site.uuid} data={site as any} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Sites Yet</h1>
      <Image alt="missing site" src="https://illustrations.popsy.co/gray/web-design.svg" width={400} height={400} />
      <p className="text-lg text-stone-500">You do not have any sites yet. Create one to get started.</p>
    </div>
  );
}
