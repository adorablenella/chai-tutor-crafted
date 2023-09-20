import React, { useEffect, useState } from "react";
import { isEmpty, startCase } from "lodash";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { createApi } from "unsplash-js";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../radix-ui";

const ACCESS_KEY: string = "phfFCfD_A95ICxvwEYsFxsgHD-1veFwGA4Cu8qxvcec";
const unsplash = createApi({ accessKey: ACCESS_KEY });

export const fetchImage = async (payload: any) =>
  new Promise((resolve, reject) => {
    unsplash.search
      .getPhotos(payload)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => reject(error));
  });

const UnsplashImages = ({ isModalView, onSelect }: { isModalView: boolean; onSelect: (_url: string) => void }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [orientation, setOrientation] = useState<null | "landscape" | "portrait" | "squarish">(null);
  const [color, setColor] = useState<null | string>(null);
  const [totalPages, setTotalPages] = useState(0);

  const searchPhotos = async (event?: React.FormEvent) => {
    let currentPage = page + 1;
    if (event) {
      event.preventDefault();
      currentPage = 1;
    }
    setPage(currentPage);
    const payload: any = { query: query as string, page: currentPage };
    if (orientation) payload.orientation = orientation;
    if (color) payload.color = color;

    fetchImage(payload)
      .then((result: any) => {
        if (currentPage === 1) setImages(result?.response?.results || []);
        else setImages([...images, ...(result?.response?.results || [])]);
        setTotalPages(result?.response?.total_pages);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!isEmpty(query)) {
      const payload: any = { query: query as string, page: 1 };
      if (orientation) payload.orientation = orientation;
      if (color) payload.color = color;
      setPage(1);
      fetchImage(payload)
        .then((result: any) => {
          setImages(result?.response?.results || []);
          setTotalPages(result?.response?.total_pages);
        })
        .catch(() => {});
    }
  }, [orientation, color]);

  return (
    <>
      <form className="rounded-md flex items-center border bg-gray-100 p-px" onSubmit={searchPhotos}>
        <Input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild className="w-10 cursor-pointer hover:bg-slate-200 h-full p-2.5">
            <MixerHorizontalIcon />
          </PopoverTrigger>
          <PopoverContent side={isModalView ? "bottom" : "right"} className="w-max flex items-center justify-center">
            <div>
              <div className="text-sm font-medium py-1">Orientation</div>
              <Select defaultValue={orientation} onValueChange={(_v) => setOrientation(_v as any)}>
                <SelectTrigger className="w-40 p-1 px-3 h-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>All</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="squarish">Square</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm font-medium pb-1 pt-2">Color</div>
              <Select defaultValue={color} onValueChange={(_v) => setColor(_v as any)}>
                <SelectTrigger className="w-40 p-1 px-3 h-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>All</SelectItem>
                  {[
                    "black_and_white",
                    "black",
                    "white",
                    "yellow",
                    "orange",
                    "red",
                    "purple",
                    "magenta",
                    "green",
                    "teal",
                    "blue",
                  ].map((_color) => (
                    <SelectItem value={_color}>{startCase(_color)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </form>
      <ScrollArea
        className={`h-full ${
          isModalView && !isEmpty(images) ? "flex flex-wrap -mx-2 px-2" : "flex flex-col pb-8 -mx-2 pt-2"
        }`}>
        {isEmpty(images) && (
          <div className="py-6 flex flex-col justify-center items-center">
            <div className="font-medium">No Data</div>
            <div className="text-sm text-gray-500">Enter query and press enter</div>
          </div>
        )}
        {isModalView ? (
          <div className="columns-3 h-full py-2">
            {images.map((pic) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                role="button"
                tabIndex={0}
                className="flex my-1"
                key={pic.id}
                onClick={() => onSelect(pic.urls.regular)}>
                <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-md">
                  <img
                    className="flex-1 rounded-md cursor-pointer h-auto transition duration-300 ease-in-out hover:scale-105"
                    alt={pic.alt_description}
                    src={pic.urls.small}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          images.map((pic) => (
            // TODO: Drag and Drop Image to Canvas from Here use `pic.urls.[small, regular, full]` for image quality
            <div className="px-2 py-1 w-full" key={pic.id}>
              <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-md">
                <img
                  className="cursor-pointer h-auto transition duration-300 ease-in-out hover:scale-105"
                  alt={pic.alt_description}
                  src={pic.urls.small}
                />
              </div>
            </div>
          ))
        )}
        {!isEmpty(images) && page < totalPages && (
          <Button size="sm" variant="link" className="w-full" onClick={() => searchPhotos(null)}>
            Load More
          </Button>
        )}
      </ScrollArea>
    </>
  );
};

export default UnsplashImages;
