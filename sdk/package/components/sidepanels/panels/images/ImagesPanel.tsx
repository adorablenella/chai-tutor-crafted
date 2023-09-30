import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../radix-ui";

const UnsplashImages = React.lazy(() => import("./UnsplashImages"));
const UploadImages = React.lazy(() => import("./UploadImages"));

const ImagesPanel = ({
  isModalView = false,
  onSelect = () => {},
}: {
  isModalView?: boolean;
  onSelect?: (url: string) => void;
}): React.JSX.Element => {
  const [tab, setTab] = useState("unsplash");
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between rounded-md bg-background/30 p-1">
        <h1 className="px-1 font-semibold">{isModalView ? "Select or upload images" : "Images"}</h1>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="flex h-full w-full flex-col py-2">
        <TabsList className="w-full">
          <TabsTrigger value="unsplash" className="w-1/2">
            Unsplash
          </TabsTrigger>
          <TabsTrigger value="upload" className="w-1/2">
            Upload
          </TabsTrigger>
        </TabsList>
        {tab === "unsplash" ? (
          <TabsContent value="unsplash" className="flex h-full flex-col overflow-hidden">
            <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-100" />}>
              <UnsplashImages isModalView={isModalView} onSelect={onSelect} />
            </Suspense>
          </TabsContent>
        ) : (
          <TabsContent value="upload" className="flex h-full flex-col overflow-hidden">
            <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-100" />}>
              <UploadImages isModalView={isModalView} onSelect={onSelect} />
            </Suspense>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ImagesPanel;
