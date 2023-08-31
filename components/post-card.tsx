import BlurImage from "@/components/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";

export default function PostCard({ data, projectData }: { data: any & { site: any | null }; projectData: any }) {
  const url = `${projectData?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data?.uuid}`;

  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link href={`/post/${data.uuid}`} className="flex flex-col overflow-hidden rounded-lg">
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.title ?? "Card thumbnail"}
            width={500}
            height={400}
            className="h-full object-cover"
            src={data.image ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          )}
        </div>
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white dark:text-white">
            {data?.page_name}
          </h3>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full px-3">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${projectData?.subdomain}.localhost:3000/${data?.uuid}`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700">
          {url} ↗
        </a>
      </div>
    </div>
  );
}
