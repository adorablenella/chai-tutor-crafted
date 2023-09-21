"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import { useEffect, useState } from "react";
import { createSite } from "@/lib/actions";

export default function CreateAppModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState({
    name: "",
    apiKey: "",
  });

  const addSite = async (formData: FormData) => {
    createSite(formData).then((res: any) => {
      if (res?.error) {
        toast.error(res?.error);
        return;
      }
      const { uuid } = res;
      router.refresh();
      router.push(`/apps/${uuid}`);
      modal?.hide();
      toast.success(`Successfully created App!`);
    });
  };

  return (
    <form
      action={addSite}
      className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700">
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">Create a new app</h2>

        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-stone-500 dark:text-stone-400">
            App Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Awesome App"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="subdomain" className="text-sm font-medium text-stone-500">
            API Key
          </label>
          <div className="flex w-full max-w-md">
            <input
              name="apiKey"
              type="text"
              placeholder="Your Project API Key"
              value={data.apiKey}
              onChange={(e) => setData({ ...data, apiKey: e.target.value })}
              autoCapitalize="off"
              pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
              maxLength={32}
              required
              className="w-full rounded-l-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
        </div>
        <input type="text" name="type" value="APP" hidden />
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <CreateAppFormButton />
      </div>
    </form>
  );
}
function CreateAppFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}>
      {pending ? <LoadingDots color="#808080" /> : <p>Create App</p>}
    </button>
  );
}