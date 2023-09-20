"use client";

import { toast } from "sonner";

export default function CopyToClipboard({
  children,
  content = "Hello World",
  className = "",
}: {
  children: React.ReactElement;
  content: string;
  className?: string;
}): React.JSX.Element {
  return (
    <div
      onClick={() => navigator.clipboard.writeText(content).then(() => toast.success("Project API Key copied"))}
      className={className}>
      {children}
    </div>
  );
}
