import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TProjectData } from "../types";
import { toast } from "sonner";

export const useUpdateProject = (message = "Project updated successfully.") => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: TProjectData) =>
      await fetch("/api/chaibuilder/project", { method: "PUT", body: JSON.stringify(payload) }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["project"]);
        toast.success(message);
      },
    },
  );
};
