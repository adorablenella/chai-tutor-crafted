import { useQueryClient } from "@tanstack/react-query";
import { FileTextIcon, GearIcon } from "@radix-ui/react-icons";
import { lazy, useCallback } from "react";
import { useToast } from "@/sdk/package/radix-ui";
import { useProject } from "./hooks/useProject";
import { BRANDING_OPTIONS_DEFAULTS } from "@/sdk/package/constants/MODIFIERS";
import { useGlobalBLocks } from "./hooks/useGlobalBlocks";
import { usePageData } from "./hooks/usePageData";
import { useCurrentPage, useCurrentPageSlug, useSyncState } from "./store";
import { TBrandingOptions, TProjectData } from "./types";
import { useUpdatePage } from "./mutations/usePageActions";
import { useUpdateProject } from "./mutations/useProjectActions";
import { isEqual } from "lodash";
import { ChaiBuilderStudio } from "@/sdk/package";

const Logo = lazy(() => import("./previews/Logo"));
const PublishButton = lazy(() => import("./previews/PublishButton"));
const Pages = lazy(() => import("./panels/Pages"));
const ProjectSettings = lazy(() => import("./panels/ProjectSettings"));

export default function RootChaiStudio() {
  const queryClient = useQueryClient();
  const { data: project } = useProject();
  const { data: globalBlocks } = useGlobalBLocks();
  const [currentPageUuid] = useCurrentPage();
  const { data: pageData, isLoading } = usePageData();
  const updatePage = useUpdatePage();
  const updateProject = useUpdateProject();
  const [, setSyncStatus] = useSyncState();
  const [slug] = useCurrentPageSlug();
  const { toast } = useToast();

  const saveBlocks = useCallback(
    async (snapshot: any) => {
      queryClient.setQueryData(["page_data", currentPageUuid], (currentData: any) => ({
        ...currentData,
        blocks: snapshot.blocks,
      }));
      updatePage.mutate(
        { uuid: currentPageUuid as string, blocks: snapshot.blocks },
        { onSuccess: () => toast({ variant: "default", title: "Page updated successfully." }) },
      );
    },
    [queryClient, currentPageUuid, updatePage, toast],
  );

  const saveBrandingOptions = useCallback(
    async (brandingOptions: any) => {
      if (!isEqual(project?.branding_options, brandingOptions)) {
        const updatedProjectData = { ...project, branding_options: brandingOptions };
        updateProject.mutate(updatedProjectData as TProjectData, {
          onSuccess: () => toast({ variant: "default", title: "Branding options updated successfully." }),
        });
      }
    },
    [project, toast, updateProject],
  );

  // @TODO: Move supabase to /api/chaibuiilder/storage
  // Issue : On accepting file in supabase it is not working as expected
  const uploadMediaCallback = async (file: File) => {
    const filePath = `${project?.uuid}/${file.name}`;
    const BUCKET = "chaibuilder-blob-storage";
    const { data, error } = { error: "Error", data: null };
    if (error || !data) throw error;
    const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
    return publicURL || "";
  };

  const fetchMediaCallback = async (limit = 100, offset = 0) => {
    const params = `project_uuid=${project?.uuid}&limit=${limit}&offset=${offset}`;
    const res = await fetch(`/api/chaibuilder/storage?${params}`).then((_res) => _res.json());
    return res;
  };

  const getPages = async () => {
    const res = await fetch(`/api/chaibuilder/pages?project_uuid=${project?.uuid}`).then((_res) => _res.json());
    return res;
  };

  return (
    <ChaiBuilderStudio
      loadingCanvas={isLoading}
      frameworkPageUrl={`/${slug}`}
      brandingOptions={(project?.branding_options ?? BRANDING_OPTIONS_DEFAULTS) as TBrandingOptions}
      blocks={pageData?.blocks ?? []}
      globalBlocks={globalBlocks ?? []}
      topBarComponents={{ left: [Logo], center: [], right: [PublishButton] }}
      sideBarComponents={{
        top: [
          { icon: FileTextIcon, name: "pages", panel: Pages },
          { icon: GearIcon, name: "settings", panel: ProjectSettings },
        ],
      }}
      darkMode
      mode="STATIC"
      apiKey={process.env.NEXT_PUBLIC_PROJECT_UUID as string}
      onSyncStatusChange={(syncStatus: "UNSAVED" | "SAVING" | "SAVED") => {
        setSyncStatus(syncStatus);
      }}
      onSaveBlocks={saveBlocks}
      onSaveBrandingOptions={saveBrandingOptions}
      uploadMediaCallback={uploadMediaCallback}
      fetchMediaCallback={fetchMediaCallback}
      getPages={getPages}
    />
  );
}
