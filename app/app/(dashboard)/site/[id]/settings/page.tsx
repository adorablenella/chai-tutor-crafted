"use Server";

import Form from "@/components/form";
import DeleteSiteForm from "@/components/form/delete-site-form";
import UpdateSiteForm from "@/components/form/update-site-form";
import { updateSite } from "@/lib/actions";
import { TProjectData } from "@/sdk/next/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function SiteSettingsIndex({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data = {} as TProjectData }: PostgrestSingleResponse<TProjectData> = await supabase
    .from("projects")
    .select("*")
    .eq("uuid", params.id)
    .single();

  return (
    <div className="flex flex-col space-y-6">
      <UpdateSiteForm
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "project_name",
          type: "text",
          defaultValue: data?.project_name!,
          placeholder: "My Awesome Site",
          maxLength: 32,
        }}
      />

      <UpdateSiteForm
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A site about really interesting things.",
        }}
      />

      <Form
        title="Social media image"
        description="The social media image for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 1200x630."
        inputAttrs={{
          name: "image",
          type: "file",
          defaultValue: data?.seo_data?.image!,
        }}
        handleSubmit={updateSite}
      />

      <DeleteSiteForm siteName={data?.project_name!} />
    </div>
  );
}
