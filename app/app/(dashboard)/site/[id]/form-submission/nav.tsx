import ExportFormSubmission from "@/components/form-submission/export-form-responses-button";
import { TProjectData } from "@/sdk/next/types";

export default function FormSubmissionHead({
  data,
  canDownload,
  project,
}: {
  data: TProjectData;
  canDownload: boolean;
  project: string;
}) {
  const url = `${data?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white xl:text-3xl">
            Form submissions for {data.project_name}
          </h1>
          <a
            href={process.env.NEXT_PUBLIC_VERCEL_ENV ? `https://${url}` : `http://${data.subdomain}.localhost:3000`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700">
            {url} ↗
          </a>
        </div>
        {canDownload && <ExportFormSubmission project={project} />}
      </div>
    </>
  );
}
