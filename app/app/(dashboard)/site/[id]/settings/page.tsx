"use Server";

import DeleteSiteForm from "@/components/form/delete-site-form";
import { getSite } from "@/app/helpers/site";
import UpdateSiteForm from "@/components/form/update-site-form";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSite(params.id);

  return (
    <div className="flex flex-col space-y-6">
      <UpdateSiteForm
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
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
          placeholder: "A blog about really interesting things.",
        }}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
