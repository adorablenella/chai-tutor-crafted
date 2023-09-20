import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TPageData } from "../types";
import { useToast } from "@/app/app/(dashboard)/editor/package";
import { useChangePage } from "../hooks/useChangePage";

export const useAddPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const changePage = useChangePage();
  return useMutation(
    async (payload: TPageData) =>
      fetch("/api/chaibuilder/pages", { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json()),
    {
      onSuccess: (response: TPageData) => {
        queryClient.invalidateQueries(["pages"]);
        changePage({ uuid: response.uuid, slug: response.slug });
        toast({ variant: "default", title: "Page added successfully." });
      },
    },
  );
};

export const useUpdatePage = () => {
  const { toast } = useToast();
  return useMutation(
    async (payload: Partial<TPageData>) =>
      fetch(`/api/chaibuilder/pages?page_uuid=${payload.uuid}`, { method: "PUT", body: JSON.stringify(payload) }),
    {
      onSuccess: () => {
        toast({ variant: "default", title: "Page updated successfully." });
      },
    },
  );
};

export const usePublishPage = () => {
  const { toast } = useToast();
  return useMutation(async (slug: string) => fetch(`/api/chaibuilder/pages?revalidate=${slug}`, { method: "GET" }), {
    onSuccess: () => {
      toast({ variant: "default", title: "Page published successfully." });
    },
  });
};

export const useDeletePage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: Partial<TPageData>) =>
      fetch(`/api/chaibuilder/pages?page_uuid=${payload.uuid}`, { method: "DELETE", body: JSON.stringify(payload) }),
    {
      onSuccess: () => {
        toast({ variant: "default", title: "Page deleted successfully." });
        queryClient.invalidateQueries(["pages"]);
      },
    },
  );
};
