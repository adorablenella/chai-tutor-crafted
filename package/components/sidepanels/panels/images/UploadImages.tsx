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
      setImages(uploadedImages);
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
      setFile(null);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    }
    setIsUploading(false);
  };

  return (
    <>
      {file ? (
        <div className="relative w-full px-1 rounded-md p-2 border bg-slate-50 flex flex-col items-center justify-center">
          <img src={URL.createObjectURL(file)} alt="" className="w-full max-w-sm h-auto rounded-md" />
          {error && <div className="text-center w-full text-red-500 text-sm pt-2">{error}</div>}
          <div className="flex justify-center items-center w-full gap-2 pt-2">
            <button
              type="button"
              onClick={onUpload}
              disabled={isUploading}
              className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white rounded-full py-1 px-3 text-sm flex items-center">
              {isUploading ? <GearIcon className="animate-spin" /> : <UploadIcon className="animate-bounce" />}
              &nbsp; {isUploading ? "Uploading..." : "Upload"}
            </button>
            {!isUploading && (
              <button
                type="button"
                className="border border-gray-300 hover:bg-gray-200 rounded-full py-1 px-3 text-sm flex items-center"
                onClick={() => setFile(null)}>
                <Cross1Icon />
                &nbsp; Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <label htmlFor={isModalView ? "upload-in-modal" : "upload-in-panel"}>
          <div className="cursor-pointer bg-gray-200 hover:bg-blue-50 border border-dashed border-blue-900 w-full rounded-md flex flex-col items-center justify-center py-8">
            <div className="text-3xl">+</div>
            <div>Click to choose file</div>
          </div>
          <input type="file" id={isModalView ? "upload-in-modal" : "upload-in-panel"} hidden onChange={onChange} />
        </label>
      )}
      <ScrollArea className={`h-full flex flex-col pb-8 -mx-2 pt-2 ${isModalView ? "px-2" : ""} pt-2`}>
        {isEmpty(images) && (
          <div className="py-6 flex flex-col justify-center items-center">
            <div className="font-medium">No Images</div>
          </div>
        )}
        {isModalView ? (
          <div className="columns-3 h-full py-2">
            {images.map((pic) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div role="button" tabIndex={0} className="flex my-1" key={pic.id} onClick={() => onSelect(pic.url)}>
                <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-md">
                  <img
                    className="flex-1 rounded-md cursor-pointer h-auto transition duration-300 ease-in-out hover:scale-105"
                    alt={pic.name}
                    src={pic.url}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          images.map((pic) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div role="button" tabIndex={0} className="px-2 py-1" key={pic.id} onClick={() => onSelect(pic.url)}>
              <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-md">
                <img
                  className="cursor-pointer w-full h-auto transition duration-300 ease-in-out hover:scale-105"
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
