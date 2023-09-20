import React, { useEffect, useState } from "react";
import { isEmpty, isEqual, isString, kebabCase, omit } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button, Checkbox, Image, Model, ScrollArea, SingleLineText } from "../../../package";
import { TPageData } from "../../types";
import { useUpdatePage } from "../../mutations/usePageActions";
import Form from "../common/Form";
import { useProject } from "../../hooks/useProject";
import { useUpdateProject } from "../../mutations/useProjectActions";

const DeletePage = React.lazy(() => import("./DeletePage"));
const ConfirmAlert = React.lazy(() => import("../common/ConfirmAlert"));

const isValidDynamicSlug = (slug: string) => {
  if (!isString(slug)) return false;
  const basicMatch = slug.includes("/[") && slug.includes("]");
  if (!basicMatch) return false;

  const DYNAMIC_ID_REGX = /^\[((?:\.{3})?[a-zA-Z0-9_-]+)\]$/;
  const CONSTANT_PATH_REGX = /^[a-zA-Z0-9_-]+$/;
  let isValidSlug: boolean = true;

  slug.split("/").forEach((_slug) => {
    if (!isValidSlug) return;
    if (_slug.includes("[[") && _slug.includes("]]")) {
      isValidSlug = /^\[\[\.{3}[a-zA-Z0-9_-]+\]\]$/.test(_slug);
    } else if (_slug.includes("[") && _slug.includes("]")) {
      isValidSlug = DYNAMIC_ID_REGX.test(_slug);
    } else {
      isValidSlug = CONSTANT_PATH_REGX.test(_slug);
    }
  });

  return isValidSlug;
};

const withEmptySeoData = (pageData: TPageData): TPageData => {
  if (pageData && isEmpty(pageData.seo_data)) {
    return {
      ...pageData,
      seo_data: { title: "", description: "", image: "" },
    };
  }
  return pageData;
};

const isSomethingChanged = (_pageData: TPageData, pageData: TPageData): boolean => {
  const isChangeInBasicInfo = !isEqual(omit(_pageData, ["seo_data"]), omit(pageData, ["seo_data"]));
  const isChangeInSeoDetail = !isEqual(withEmptySeoData(pageData).seo_data, withEmptySeoData(_pageData).seo_data);
  return isChangeInBasicInfo || isChangeInSeoDetail;
};

const PageDetail = ({
  open,
  setOpen,
  pageData,
}: {
  open: string;
  pageData: TPageData;
  setOpen: Function;
}): React.ReactElement => {
  const queryClient = useQueryClient();
  const { data: projectData } = useProject();
  const updatePage = useUpdatePage();
  const updateProject = useUpdateProject();
  const [_pageData, _setPageData] = useState<TPageData>(withEmptySeoData(pageData));
  const [_projectData, setProjectData] = useState({ isHomePage: projectData.homepage === pageData.uuid });
  const isAnyChangeInPage = isSomethingChanged(_pageData, pageData);

  useEffect(() => {
    const isPageDataChange = !isEqual(withEmptySeoData(pageData), _pageData);
    const isProjectDataChange = projectData.homepage !== pageData.uuid && _projectData.isHomePage;
    setOpen(isPageDataChange || isProjectDataChange ? "PENDING" : "OPEN");
  }, [projectData, pageData, _pageData, _projectData]);

  const handleSubmit = () => {
    if (isAnyChangeInPage) {
      if (pageData.type === "DYNAMIC" && !isValidDynamicSlug(_pageData?.slug || "")) {
        if (open === "ALERT") setOpen("PENDING");
        return;
      }
      updatePage.mutate(_pageData as TPageData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["pages", projectData.uuid]);
          setOpen("CLOSE");
        },
      });
    }
    if (_projectData.isHomePage && projectData.homepage !== pageData.uuid) {
      updateProject.mutate({ ...projectData, homepage: pageData.uuid }, { onSuccess: () => setOpen("CLOSE") });
    }
  };

  const updatePageRealtime = ({ formData }, key?: string): void => {
    _setPageData((currentData: TPageData) => {
      const newData = { [key]: formData[key] };
      if (key === "page_name") {
        newData.slug = kebabCase(formData[key]?.replace(/\d/g, ""));
      } else if (key === "slug") {
        newData.slug = formData[key]?.replace(/\d/g, "").replace(/\s+/g, "").replace("--", "-").replace("__", "_");
      } else if (key === "seo_data") {
        newData.seo_data = {
          title: formData[key].title || "",
          description: formData[key].description || "",
          image: formData[key].image || "",
        };
      }
      return {
        ...currentData,
        ...newData,
      };
    });
  };

  const updateProjectRealtime = ({ formData }, key?: string): void => {
    setProjectData((currentData: { isHomePage: boolean }) => {
      const newData = { [key]: formData[key] };
      return {
        ...currentData,
        ...newData,
      };
    });
  };

  const basicProperties = {
    page_name: SingleLineText({ title: "Page Name", default: _pageData.page_name as string }),
    slug: SingleLineText({ title: "Page Slug", default: _pageData.slug }),
  };

  const seoProperties = {
    seo_data: Model({
      title: "",
      description: "",
      default: {
        title: "",
        description: "",
        image: "",
      },
      properties: {
        title: SingleLineText({ title: "Meta Title", default: _pageData.page_name as string }),
        description: SingleLineText({ title: "Meta Description", default: _pageData.slug }),
        image: Image({ title: "Favicon", default: "" }),
      },
    }),
  };

  const homePageProperties = {
    isHomePage: Checkbox({ title: "Set as homepage", default: _projectData.isHomePage }),
  };

  return (
    <ScrollArea className="flex h-full select-none flex-col">
      <ConfirmAlert
        open={open === "ALERT"}
        title="Do yo want to save changes?"
        onCancel={() => setOpen("CLOSE")}
        onConfirm={handleSubmit}
        disabled={updateProject.isLoading || updatePage.isLoading}
      />
      <div className="rounded-md bg-background/30 px-2.5 py-1">
        <h1 className="px-1 font-semibold">Page Details</h1>
      </div>
      <div className="px-2.5 pt-2">
        <div className="flex flex-col space-y-2">
          <Form
            title="Basic Details"
            formData={_pageData}
            properties={basicProperties}
            onChange={updatePageRealtime}
            disabled={updatePage.isLoading || updateProject.isLoading}
          />
          <div className="h-2 w-full" />
          <Form
            title="SEO Details"
            formData={_pageData}
            properties={seoProperties}
            onChange={updatePageRealtime}
            disabled={updatePage.isLoading || updateProject.isLoading}
          />
          {projectData.homepage !== pageData.uuid && pageData.type === "STATIC" ? (
            <Form
              formData={_projectData}
              properties={homePageProperties}
              onChange={updateProjectRealtime}
              disabled={updatePage.isLoading || updateProject.isLoading}
            />
          ) : (
            pageData.type === "STATIC" && (
              <div className="flex items-center gap-x-1 px-1 pt-2 text-xs font-medium text-gray-500">
                <HomeIcon /> This is homepage{" "}
              </div>
            )
          )}
          {_pageData.type === "DYNAMIC" && !isValidDynamicSlug(_pageData?.slug || "") && (
            <small className="px-1 text-red-400">
              Add dynamic ID in page slug Eg: <i className="underline">some-url/[some-id]</i>
            </small>
          )}
          <div className="my-2 flex w-full items-center justify-between gap-x-2 px-1">
            <Button
              className="w-full"
              type="submit"
              onClick={handleSubmit}
              disabled={
                projectData.homepage !== pageData.uuid && _projectData.isHomePage
                  ? false
                  : isEmpty(_pageData.page_name) ||
                    isEmpty(_pageData.slug) ||
                    !isAnyChangeInPage ||
                    updatePage.isLoading ||
                    updateProject.isLoading ||
                    (_pageData.type === "DYNAMIC" && !isValidDynamicSlug(_pageData?.slug || ""))
              }>
              Save
            </Button>
            <DeletePage pageData={pageData} projectData={projectData} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PageDetail;
