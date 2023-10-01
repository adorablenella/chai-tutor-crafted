import SiteCard from "./site-card";
import Image from "next/image";
import { TProjectData } from "@/sdk/next/types";

export default function Apps({ apps }: { apps: TProjectData[] }) {
  return apps && apps.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {apps.map((app) => (
        <SiteCard key={app.uuid} data={app as any} />
      ))}
    </div>
  ) : (
    <div className="mt-40 flex flex-col items-center space-x-4">
      <h1 className="mt-20 font-cal text-4xl">No Apps Yet</h1>
      <Image alt="missing site" src="https://illustrations.popsy.co/gray/web-design.svg" width={400} height={400} />
      <p className="text-lg text-stone-500">Coming soon. ChaiBuilder apps are custom NextJS apps. </p>
      <p className="text-lg text-stone-500">Apps will allow you to create your own custom blocks.</p>
    </div>
  );
}
