import React from "react";
import { useBuilderProp } from "../../hooks/useBuilderProp";
import { Globe } from "lucide-react";

export const SubdomainLink = () => {
  const previewLink: string = useBuilderProp("previewLink", "");
  const url = new URL(previewLink);

  if (url.hostname.startsWith("undefined.")) return null;

  return (
    <a
      href={url.origin}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-x-1 rounded-full bg-gray-200 px-2 py-1 text-xs duration-300 hover:bg-gray-300/80">
      <Globe size={12} color="#808080" />
      {url.host}
    </a>
  );
};
