"use client";

import { TFormSubmission } from "@/sdk/next/types";
import { Button, Tooltip, TooltipProvider, TooltipTrigger } from "@/sdk/package/radix-ui";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { map, omit } from "lodash";
import React from "react";

export default function FormSubmissionDataPopup({ data }: { data: TFormSubmission }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant="outline">View Response</Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-md border bg-black text-white p-2 space-y-1 shadow-lg">
          {React.Children.toArray(
            map(omit(data.form_data, ['domain', 'page_url']), (value, key) => (
              <div className="flex max-w-xs items-start whitespace-pre-wrap break-normal text-sm">
                <span className="capitalize opacity-80">{key}:</span>
                <span className="break-normal pl-1 font-medium">{value}</span>
              </div>
            )),
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
