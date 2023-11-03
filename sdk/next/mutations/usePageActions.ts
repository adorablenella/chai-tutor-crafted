import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TPageData } from "../types";
import { useChangePage } from "../hooks/useChangePage";
import { useProject } from "@/sdk/next/hooks/useProject";
import { toast } from "sonner";

export const useAddPage = () => {
  const queryClient = useQueryClient();
  const changePage = useChangePage();
  return useMutation(
    async (payload: TPageData) =>
      fetch("/api/chaibuilder/pages", { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json()),
    {
      onSuccess: (response: TPageData) => {
        queryClient.invalidateQueries(["pages"]);
        changePage({ uuid: response.uuid, slug: response.slug });
        toast.success("Page added successfully.");
      },
    },
  );
};

export const useUpdatePage = () => {
  return useMutation(async (payload: Partial<TPageData>) =>
    fetch(`/api/chaibuilder/pages?page_uuid=${payload.uuid}`, { method: "PUT", body: JSON.stringify(payload) }),
  );
};

export const usePublishPage = () => {
  const { data: project } = useProject();
  const domain = project?.subdomain;
  return useMutation(
    async (slug: string) => fetch(`/api/chaibuilder/publish?slug=${slug}&domain=${domain}`, { method: "GET" }),
    {
      onSuccess: () => {
        toast.success("Page published successfully.", { position: "top-right", duration: 2000 });
      },
    },
  );
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: Partial<TPageData>) =>
      fetch(`/api/chaibuilder/pages?page_uuid=${payload.uuid}`, { method: "DELETE", body: JSON.stringify(payload) }),
    {
      onSuccess: () => {
        toast.success("Page deleted successfully.");
        queryClient.invalidateQueries(["pages"]);
      },
    },
  );
};
