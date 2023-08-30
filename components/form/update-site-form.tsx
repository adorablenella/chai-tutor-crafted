"use client";

import { updateSite } from "@/app/helpers/site";
import Form from ".";

export default function UpdateSiteForm(props: any) {
  return (
    <Form
      {...props}
      handleSubmit={async (...rest: any) => await updateSite.apply(null, rest)}
    />
  );
}
