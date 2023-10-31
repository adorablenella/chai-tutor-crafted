"use client";

import { useSupabaseClient } from "@/lib/hooks/use-supabase-client";
import { useState } from "react";
import LoadingDots from "../icons/loading-dots";
import { isEmpty } from "lodash";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ExportFormSubmission({ project }: { project: string }) {
  const [downloading, setDownloading] = useState(false);
  const supabase = useSupabaseClient();

  return (
    <button
      onClick={async () => {
        setDownloading(true);
        const { data } = await supabase
          .from("form_submission")
          .select("created_at, form_name, page_url, form_data")
          .eq("project", project)
          .csv();

        const blob = new Blob([data as string], { type: "text/csv" });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${project}_${new Date().toISOString()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Form submission exported as CSV successfully!`);
        setDownloading(false);
      }}
      disabled={downloading}
      className={cn(
        "flex h-10 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        downloading
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-white text-black hover:bg-black hover:text-white dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}>
      {downloading ? <LoadingDots color="#808080" /> : "Export as CSV"}
    </button>
  );
}
