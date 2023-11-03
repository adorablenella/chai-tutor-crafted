import { FileTextIcon, GearIcon } from "@radix-ui/react-icons";
import { lazy, useCallback, useEffect } from "react";
import { useProject } from "./hooks/useProject";
import { BRANDING_OPTIONS_DEFAULTS } from "@/sdk/package/constants/MODIFIERS";
import { useGlobalBLocks } from "./hooks/useGlobalBlocks";
import { usePageData } from "./hooks/usePageData";
import { useCurrentPage, useSyncState } from "./store";
import { TBrandingOptions, TProjectData } from "./types";
import { useUpdatePage } from "./mutations/usePageActions";
import { useUpdateProject } from "./mutations/useProjectActions";
import { isEmpty, isEqual } from "lodash";
import { ChaiBuilderStudio } from "@/sdk/package";
import { useUploadMedia } from "./mutations/useStorageActions";
import { useExternalPredefinedBlock, useUiLibraryBlocks } from "./hooks/useUiLibrary";
import { toast } from "sonner";

const Logo = lazy(() => import("./previews/Logo"));
const PublishButton = lazy(() => import("./previews/PublishButton"));
const Pages = lazy(() => import("./panels/Pages"));
const ProjectSettings = lazy(() => import("./panels/ProjectSettings"));
const CurrentPage = lazy(() => import("./previews/CurrentPage"));

export default function RootChaiStudio() {
  const { data: project } = useProject();
  const { data: globalBlocks } = useGlobalBLocks();
  const { data: pageData, isLoading } = usePageData();
  const [currentPageUuid] = useCurrentPage();
  const [syncStatus, setSyncStatus] = useSyncState();

  const updatePage = useUpdatePage();
  const updateProject = useUpdateProject("Branding options updated successfully.");
  const uploadMedia = useUploadMedia();
  const uiLibrary = useUiLibraryBlocks();
  const predefinedBlock = useExternalPredefinedBlock();

  useEffect(() => {
    if (syncStatus !== "SAVED" && currentPageUuid) {
      window.onbeforeunload = () => "";
    } else {
      window.onbeforeunload = null;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [syncStatus, currentPageUuid]);

  const saveBlocks = useCallback(
    async (snapshot: any) => {
      updatePage.mutate(
        { uuid: currentPageUuid as string, blocks: snapshot.blocks },
        {
          onSuccess: () => {
            toast.success("Page saved successfully.", { position: "top-center", duration: 2500 });
          },
        },
      );
    },
    [currentPageUuid, updatePage],
  );

  const saveBrandingOptions = useCallback(
    async (brandingOptions: any) => {
      if (!isEqual(project?.branding_options, brandingOptions)) {
        const updatedProjectData = { ...project, branding_options: brandingOptions };
        updateProject.mutate(updatedProjectData as TProjectData);
      }
    },
    [project, updateProject],
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

  const getUILibraryBlocks = useCallback(async () => {
    return await uiLibrary.mutateAsync();
  }, [uiLibrary]);

  const getExternalPredefinedBlock = useCallback(
    async (block: any) => {
      return await predefinedBlock.mutateAsync(block);
    },
    [predefinedBlock],
  );

  const isHomePage = pageData?.uuid === project?.homepage;
  let domain = (project?.customDomain || project?.subdomain) + "." + (process.env.NEXT_PUBLIC_ROOT_DOMAIN as string);
  domain = process.env.NEXT_PUBLIC_VERCEL_ENV ? `https://${domain}` : `http://${project?.subdomain}.localhost:3000`;

  const brandingOptions = isEmpty(project?.branding_options) ? BRANDING_OPTIONS_DEFAULTS : project?.branding_options;

  return (
    <ChaiBuilderStudio
      previewLink={`${domain}/${isHomePage ? "" : pageData?.slug}`}
      loadingCanvas={isLoading}
      brandingOptions={brandingOptions as TBrandingOptions}
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
      getUILibraryBlocks={getUILibraryBlocks}
      getExternalPredefinedBlock={getExternalPredefinedBlock}
      uploadMediaCallback={uploadMediaCallback}
      fetchMediaCallback={fetchMediaCallback}
      getPages={getPages}
    />
  );
}
