import { Suspense } from "react";
import Sites from "@/components/sites";
import PlacholderCard from "@/components/placeholder-card";
import CreateSiteButton from "@/components/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TProjectData } from "@/sdk/next/types";

export default async function AllSites() {
  const supabase = createServerComponentClient({ cookies });
  const session = await getSession();
  if (!session) redirect("/login");

  const { data: sites = [] } = await supabase
    .from("projects")
    .select("*")
    .eq("user", session.user.id)
    .eq("type", "WEBSITE");

  const canAddMoreSite = sites && sites?.length < 1;

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">All Sites</h1>
          <CreateSiteButton title="Create New Site">
            <CreateSiteModal canAddMore={Boolean(canAddMoreSite)} />
          </CreateSiteButton>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlacholderCard key={i} />
              ))}
            </div>
          }>
          <Sites sites={sites as TProjectData[]} />
        </Suspense>
      </div>
    </div>
  );
}
