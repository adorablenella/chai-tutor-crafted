import { PlusCircle } from "lucide-react";
import { cn } from "@/sdk/package/radix/lib/utils";

const EmptySlot = ({
  blockProps,
  className = "",
  text = "BLOCK",
}: {
  blockProps?: any;
  className?: any;
  text?: string;
}) => {
  return (
    <div {...blockProps} className={cn("flex h-20 flex-col items-center justify-center", className)}>
      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(#CCC,transparent_1.5px)] outline-dashed outline-2 outline-gray-400 duration-300 [background-size:12px_12px] dark:bg-[radial-gradient(#AAA,transparent_1.5px)]">
        <span className="opacit flex items-center gap-x-1.5 text-xs font-semibold text-gray-400">
          <PlusCircle size={13} /> ADD {text}
        </span>
      </div>
    </div>
  );
};

export default EmptySlot;
