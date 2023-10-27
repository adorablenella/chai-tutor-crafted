"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useState } from "react";
import { deleteProject } from "@/lib/actions";

export default function DeleteSiteForm({ siteName }: { siteName: string }) {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [enteredName, setEnteredName] = useState("");

  return (
    <>
      <form
        action={async (data: FormData) =>
          deleteProject(data, id, "")
            .then(async (res) => {
              if (res?.error) {
                toast.error(res?.message);
                return;
              }
              router.refresh();
              router.push("/");
              toast.success(`Successfully deleted project!`);
            })
            .catch((err: Error) => toast.error(err.message))
        }
        className="rounded-lg border border-red-600 bg-white dark:bg-black">
        <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
          <h2 className="font-cal text-xl dark:text-white">Delete Site</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Deletes your site and all posts associated with it. Type in the name of your site <b>{siteName}</b> to
            confirm.
          </p>

          <input
            name="confirm"
            type="text"
            required
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
            pattern={siteName}
            placeholder={siteName}
            className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
          <p className="text-center text-sm text-stone-500 dark:text-stone-400">
            This action is irreversible. Please proceed with caution.
          </p>
          <div className="w-32">
            <FormButton disabled={enteredName !== siteName} />
          </div>
        </div>
      </form>
    </>
  );
}

function FormButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending || disabled
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 dark:hover:bg-transparent",
      )}
      disabled={pending || disabled}>
      {pending ? <LoadingDots color="#808080" /> : <p>Confirm Delete</p>}
    </button>
  );
}
