import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Cross1Icon, GearIcon, UploadIcon } from "@radix-ui/react-icons";
import { atom, useAtom } from "jotai";
import { ScrollArea } from "../../../../radix-ui";
import { useBuilderProp } from "../../../../hooks/useBuilderProp";

const uploadedMediaAtom = atom<any[]>([]);

// @TODO: Loading media and showing skeleton for uploaded images and unsplash images
const UploadImages = ({ isModalView, onSelect }: { isModalView: boolean; onSelect: (_url: string) => void }) => {
  const uploadImage = useBuilderProp("uploadMediaCallback", () => "");
  const fetchImages = useBuilderProp("fetchMediaCallback", () => []);

  const [images, setImages] = useAtom(uploadedMediaAtom);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const uploadedImages = await fetchImages();
      setImages(uploadedImages || []);
    })();
  }, []);

  const onChange = (e: any) => {
    if (e && e?.target?.files?.length > 0) setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      const uploadedImages = await fetchImages();
      setImages(uploadedImages);
      onSelect(url);
      setFile(undefined);
    } catch (err: any) {
      setImages([]);
      setError(err?.message || "Something went wrong.");
    }
    setIsUploading(false);
  };

  return (
    <>
      {file ? (
        <div className="relative flex w-full flex-col items-center justify-center rounded-md border bg-slate-50 p-2 px-1">
          <img src={URL.createObjectURL(file)} alt="" className="h-auto w-full max-w-sm rounded-md" />
          {error && <div className="w-full pt-2 text-center text-sm text-red-500">{error}</div>}
          <div className="flex w-full items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={onUpload}
              disabled={isUploading}
              className="flex items-center rounded-full bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 hover:text-white">
              {isUploading ? <GearIcon className="animate-spin" /> : <UploadIcon className="animate-bounce" />}
              &nbsp; {isUploading ? "Uploading..." : "Upload"}
            </button>
            {!isUploading && (
              <button
                type="button"
                className="flex items-center rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-200"
                onClick={() => setFile(undefined)}>
                <Cross1Icon />
                &nbsp; Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <label htmlFor={isModalView ? "upload-in-modal" : "upload-in-panel"}>
          <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-blue-900 bg-gray-200 py-8 hover:bg-blue-50">
            <div className="text-3xl">+</div>
            <div>Click to choose file</div>
          </div>
          <input type="file" id={isModalView ? "upload-in-modal" : "upload-in-panel"} hidden onChange={onChange} />
        </label>
      )}
      <ScrollArea className={`-mx-2 flex h-full flex-col pb-8 pt-2 ${isModalView ? "px-2" : ""} pt-2`}>
        {isEmpty(images) && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="font-medium">No Images</div>
          </div>
        )}
        {isModalView ? (
          <div className="h-full columns-3 py-2">
            {images?.map((pic) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div role="button" tabIndex={0} className="my-1 flex" key={pic.id} onClick={() => onSelect(pic.url)}>
                <div className="relative overflow-hidden rounded-md bg-cover bg-no-repeat">
                  <img
                    className="h-auto flex-1 cursor-pointer rounded-md transition duration-300 ease-in-out hover:scale-105"
                    alt={pic.name}
                    src={pic.url}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          images?.map((pic) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div role="button" tabIndex={0} className="px-2 py-1" key={pic.id} onClick={() => onSelect(pic.url)}>
              <div className="relative overflow-hidden rounded-md bg-cover bg-no-repeat">
                <img
                  className="h-auto w-full cursor-pointer transition duration-300 ease-in-out hover:scale-105"
                  alt={pic.name}
                  src={pic.url}
                />
              </div>
            </div>
          ))
        )}
        {/* TODO: Update logic here for limit and offset. fetchImages(limit, offset) already support */}
        {/* {!isEmpty(images) && (
          <Button size="sm" variant="link" className="w-full" onClick={() => {}}>
            Load More
          </Button>
        )} */}
      </ScrollArea>
    </>
  );
};

export default UploadImages;
