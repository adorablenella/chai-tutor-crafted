import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "../../../package";
import { TPageData, TProjectData } from "../../types";
import { useDeletePage } from "../../mutations/usePageActions";
import { useChangePage } from "../../hooks/useChangePage";

const DeletePage = ({
  pageData,
  projectData,
}: {
  pageData: TPageData;
  projectData: TProjectData;
}): React.ReactElement => {
  const setCurrentPage = useChangePage();
  const deletePage = useDeletePage();
  const isHomePage = pageData.uuid === projectData.homepage;

  const handleDelete = () => {
    deletePage.mutate(pageData, {
      onSuccess: () => {
        setCurrentPage({ uuid: projectData.homepage, slug: "/home" });
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isHomePage}>
        <div
          className={`flex h-full items-center justify-center rounded-md border px-2 py-2 font-medium hover:bg-red-400 hover:text-white ${
            isHomePage ? "cursor-not-allowed border-red-200 text-red-200" : "cursor-pointer border-red-400 text-red-400"
          }`}>
          <TrashIcon />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Are you sure you want to delete <i className="text-red-500">{pageData.page_name}</i> page?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your page.
        </AlertDialogDescription>
        <div className="flex items-center justify-end gap-x-3">
          <AlertDialogCancel disabled={deletePage.isLoading}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={deletePage.isLoading}>
            Yes, Delete
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePage;
