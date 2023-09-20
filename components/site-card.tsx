import BlurImage from "@/components/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";

export default function SiteCard({ data }: { data: any }) {
  const isWebsite = data.type === "WEBSITE";
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={isWebsite ? `/site/${data?.uuid}` : `/app/${data?.uuid}`}
        className="flex flex-col overflow-hidden rounded-lg">
        <BlurImage
          alt={data.name ?? "Card thumbnail"}
          width={500}
          height={400}
          className="h-44 object-cover"
          src={data.image ?? "/placeholder.png"}
          placeholder="blur"
          blurDataURL={placeholderBlurhash}
        />
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
            {data?.project_name}
          </h3>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-3">
        {isWebsite ? (
          <a
            href={process.env.NEXT_PUBLIC_VERCEL_ENV ? `https://${url}` : `http://${data.subdomain}.localhost:3000`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700">
            {url} ↗
          </a>
        ) : (
          <span className="truncate rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700">
            {data.uuid}
          </span>
        )}
      </div>
    </div>
  );
}
