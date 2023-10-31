import FormSubmissionTable from "@/components/form-submission/form-submission-table";
import { TFormSubmission } from "@/sdk/next/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { isEmpty } from "lodash";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function FormSubmissions({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data = [] }: PostgrestSingleResponse<Array<TFormSubmission>> = await supabase
    .from("form_submission")
    .select("*")
    .eq("project", params.id)
    .order("created_at", { ascending: false })
    .limit(100);

  if (isEmpty(data)) {
    return (
      <div className="mt-20 flex flex-col items-center space-x-4">
        <h1 className="font-cal text-4xl">No responses yet</h1>
        <Image alt="missing site" src="https://illustrations.popsy.co/gray/web-design.svg" width={400} height={400} />
        <p className="text-lg text-stone-500">No responses recorded yet. Please visit back later.</p>
      </div>
    );
  }

  return <FormSubmissionTable data={data || []} />;
}
