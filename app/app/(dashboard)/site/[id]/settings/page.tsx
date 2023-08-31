"use Server";

import DeleteSiteForm from "@/components/form/delete-site-form";
import UpdateSiteForm from "@/components/form/update-site-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function SiteSettingsIndex({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data = {} } = await supabase.from("projects").select("*").eq("uuid", params.id).single();

  return (
    <div className="flex flex-col space-y-6">
      <UpdateSiteForm
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.project_name!,
          placeholder: "My Awesome Site",
          maxLength: 32,
        }}
      />

      <DeleteSiteForm siteName={data?.project_name!} />
    </div>
  );
}
