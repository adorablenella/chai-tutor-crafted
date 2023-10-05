import React, { useState } from "react";
import { isString, kebabCase } from "lodash";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/sdk/package/radix-ui";
import { TPageData, TPageSEOData } from "../../types";
import { useAddPage } from "../../mutations/usePageActions";
import { useProject } from "../../hooks/useProject";
import Form from "../common/Form";
import { SelectOption, SingleLineText } from "@/sdk/package/controls";

/**
 *
 * @param slug
 * @returns Check if is valid dynamic slug
 */
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

const AddPageModalContent = ({ closeModal }: { closeModal: Function }): React.ReactElement => {
  const { data: projectData } = useProject();
  const addPage = useAddPage();
  const [pageData, setPageData] = useState<Partial<TPageData>>({
    page_name: "",
    slug: "",
    blocks: [],
    type: "STATIC",
    project: projectData?.uuid,
    seo_data: {} as TPageSEOData,
  });

  const handleAddPage = () => {
    if (pageData.type === "DYNAMIC" && !isValidDynamicSlug(pageData?.slug || "")) return;
    addPage.mutate(pageData as TPageData, {
      onSuccess: () => closeModal(),
    });
  };

  const updateRealtime = ({ formData }: any, key?: string): void => {
    //@ts-ignore
    setPageData((currentData: TPageData) => {
      if (!key) currentData;
      const newData = { [key as string]: formData[key as string] };
      if (key === "page_name") {
        newData.slug = kebabCase(formData[key]?.replace(/\d/g, ""));
      } else if (key === "slug") {
        newData.slug = formData[key]?.replace(/\d/g, "").replace(/\s+/g, "").replace("--", "-").replace("__", "_");
      }
      return {
        ...currentData,
        ...newData,
      };
    });
  };

  const properties = {
    // type: SelectOption({
    //   title: "Page Type",
    //   default: pageData.type,
    //   options: [
    //     { title: "Static", value: "STATIC" },
    //     { title: "Dynamic", value: "DYNAMIC" },
    //   ],
    // }),
    page_name: SingleLineText({ title: "Page Name", default: pageData.page_name as string }),
    slug: SingleLineText({ title: "Page Slug", default: pageData.slug }),
  };

  return (
    <DialogContent>
      <div className="px-1 font-bold">Add Page</div>
      <Form formData={pageData} properties={properties} onChange={updateRealtime} disabled={addPage.isLoading} />
      {pageData.type === "DYNAMIC" && !isValidDynamicSlug(pageData?.slug || "") && (
        <small className="px-1">
          Add dynamic Id in slug Eg: <i className="underline">path/[some-id]</i>
        </small>
      )}
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          disabled={
            !pageData.page_name ||
            !pageData.slug ||
            pageData.page_name?.length < 2 ||
            pageData.slug?.length < 2 ||
            addPage.isLoading ||
            (pageData.type === "DYNAMIC" && !isValidDynamicSlug(pageData?.slug || ""))
          }
          onClick={handleAddPage}>
          Add Page
        </Button>
      </div>
    </DialogContent>
  );
};

const AddPageModal = (): React.ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <Button size="sm" variant="link" className="text-blue-500" onClick={() => setOpen(!open)}>
          + New Page
        </Button>
      </DialogTrigger>
      {open && <AddPageModalContent closeModal={() => setOpen(!open)} />}
    </Dialog>
  );
};

export default AddPageModal;
