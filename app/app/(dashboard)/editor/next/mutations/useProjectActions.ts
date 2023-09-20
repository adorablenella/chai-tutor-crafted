/* eslint-disable no-return-await */
// need 3 mutations
// update project seo settings
// update project custom code

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TProjectData } from "../types";
import { toast } from "@/app/app/(dashboard)/editor/package";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: TProjectData) =>
      await fetch("/api/chaibuilder/project", { method: "PUT", body: JSON.stringify(payload) }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["project"]);
        toast({ variant: "default", title: "Project updated successfully." });
      },
    },
  );
};
