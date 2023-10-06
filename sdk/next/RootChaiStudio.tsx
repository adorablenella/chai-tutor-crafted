import { FileTextIcon, GearIcon } from "@radix-ui/react-icons";
import { lazy, useCallback, useEffect } from "react";
import { useToast } from "@/sdk/package/radix-ui";
import { useProject } from "./hooks/useProject";
import { BRANDING_OPTIONS_DEFAULTS } from "@/sdk/package/constants/MODIFIERS";
import { useGlobalBLocks } from "./hooks/useGlobalBlocks";
import { usePageData } from "./hooks/usePageData";
import { useCurrentPage, useSyncState } from "./store";
import { TBrandingOptions, TProjectData } from "./types";
import { useUpdatePage } from "./mutations/usePageActions";
import { useUpdateProject } from "./mutations/useProjectActions";
import { isEqual } from "lodash";
import { ChaiBuilderStudio } from "@/sdk/package";
import { useUploadMedia } from "./mutations/useStorageActions";

const Logo = lazy(() => import("./previews/Logo"));
const PublishButton = lazy(() => import("./previews/PublishButton"));
const Pages = lazy(() => import("./panels/Pages"));
const ProjectSettings = lazy(() => import("./panels/ProjectSettings"));
const CurrentPage = lazy(() => import("./previews/CurrentPage"));

export default function RootChaiStudio() {
  const { toast } = useToast();
  const { data: project } = useProject();
  const { data: globalBlocks } = useGlobalBLocks();
  const { data: pageData, isLoading } = usePageData();
  const [currentPageUuid] = useCurrentPage();
  const [syncStatus, setSyncStatus] = useSyncState();

  const updatePage = useUpdatePage();
  const updateProject = useUpdateProject();
  const uploadMedia = useUploadMedia();

  useEffect(() => {
    if (syncStatus !== "SAVED") {
      window.onbeforeunload = () => {
        return "You have unsaved changes. Please save before leaving.";
      };
    } else {
      window.onbeforeunload = null;
    }

    return () => window.removeEventListener("beforeunload", () => {});
  }, [syncStatus]);

  const saveBlocks = useCallback(
    async (snapshot: any) => {
      updatePage.mutate(
        { uuid: currentPageUuid as string, blocks: snapshot.blocks },
        { onSuccess: () => toast({ variant: "default", title: "Page updated successfully." }) },
      );
    },
    [currentPageUuid, updatePage, toast],
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

  const uploadMediaCallback = useCallback(
    async (file: File) => {
      return await uploadMedia.mutateAsync(file);
    },
    [uploadMedia],
  );

  const fetchMediaCallback = async (limit = 100, offset = 0) => {
    const params = `project_uuid=${project?.uuid}&limit=${limit}&offset=${offset}`;
    return await fetch(`/api/chaibuilder/storage?${params}`).then((_res) => _res.json());
  };

  const getPages = async () => {
    return await fetch(`/api/chaibuilder/pages?project_uuid=${project?.uuid}`).then((_res) => _res.json());
  };

  const isHomePage = pageData?.uuid === project?.homepage;
  let domain = (project?.customDomain || project?.subdomain) + "." + (process.env.NEXT_PUBLIC_ROOT_DOMAIN as string);
  domain = process.env.NEXT_PUBLIC_VERCEL_ENV ? `https://${domain}` : `http://${project?.subdomain}.localhost:3000`;

  return (
    <ChaiBuilderStudio
      previewLink={`${domain}/${isHomePage ? "" : pageData?.slug}?_preview=true`}
      loadingCanvas={isLoading}
      brandingOptions={(project?.branding_options ?? BRANDING_OPTIONS_DEFAULTS) as TBrandingOptions}
      blocks={pageData?.blocks ?? []}
      globalBlocks={globalBlocks ?? []}
      topBarComponents={{
        left: [Logo],
        center: [CurrentPage],
        right: [PublishButton],
      }}
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
