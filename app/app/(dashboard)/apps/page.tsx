import { Suspense } from "react";
import PlacholderCard from "@/components/placeholder-card";
import CreateSiteButton from "@/components/create-site-button";
import Apps from "@/components/apps";
import CreateAppModal from "@/components/modal/create-app";

export default function AllApps() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">All Apps</h1>
          <CreateSiteButton title="Create New App">
            <CreateAppModal />
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
          <Apps />
        </Suspense>
      </div>
    </div>
  );
}
