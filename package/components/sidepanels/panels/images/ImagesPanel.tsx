import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../..";

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
    <div className="flex flex-col h-full">
      <div className="bg-background/30 p-1 flex items-center justify-between rounded-md">
        <h1 className="px-1 font-semibold">{isModalView ? "Select or upload images" : "Images"}</h1>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="flex flex-col h-full w-full py-2">
        <TabsList className="w-full">
          <TabsTrigger value="unsplash" className="w-1/2">
            Unsplash
          </TabsTrigger>
          <TabsTrigger value="upload" className="w-1/2">
            Upload
          </TabsTrigger>
        </TabsList>
        {tab === "unsplash" ? (
          <TabsContent value="unsplash" className="flex flex-col h-full overflow-hidden">
            <Suspense fallback={<div className="w-full h-64 bg-gray-100 animate-pulse" />}>
              <UnsplashImages isModalView={isModalView} onSelect={onSelect} />
            </Suspense>
          </TabsContent>
        ) : (
          <TabsContent value="upload" className="flex flex-col h-full overflow-hidden">
            <Suspense fallback={<div className="w-full h-64 bg-gray-100 animate-pulse" />}>
              <UploadImages isModalView={isModalView} onSelect={onSelect} />
            </Suspense>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ImagesPanel;
