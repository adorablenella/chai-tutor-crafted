import FormSubmissionTable from "@/components/form-submission/form-submission-table";
import { TFormSubmission } from "@/sdk/next/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { isEmpty } from "lodash";
import { cookies } from "next/headers";
import Image from "next/image";
import FormSubmissionHead from "./nav";
import { notFound } from "next/navigation";

export default async function FormSubmissions({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: project = {} } = await supabase.from("projects").select("*").eq("uuid", params.id).single();

  if (!project) return notFound();

  const { data = [] }: PostgrestSingleResponse<Array<TFormSubmission>> = await supabase
    .from("form_submission")
    .select("*")
    .eq("project", params.id)
    .order("created_at", { ascending: false })
    .limit(100);

  const hasResponse = !isEmpty(data);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-6">
      <FormSubmissionHead data={project} project={params.id} canDownload={hasResponse} />
      {hasResponse ? (
        <div className="h-full w-full flex-1">
          <FormSubmissionTable data={data || []} />
        </div>
      ) : (
        <div className="flex h-[75vh] w-full flex-col items-center justify-center">
          <h1 className="font-cal text-4xl">No responses yet</h1>
          <Image alt="missing site" src="https://illustrations.popsy.co/gray/web-design.svg" width={400} height={400} />
          <p className="text-lg text-stone-500">No responses recorded yet. Please visit back later.</p>
        </div>
      )}
    </div>
  );
}
