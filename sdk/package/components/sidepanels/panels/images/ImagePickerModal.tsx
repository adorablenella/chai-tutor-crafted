import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../../../index";
import ImagesPanel from "./ImagesPanel";

const ImagePickerModal = ({ children, onSelect }: { children: React.JSX.Element; onSelect: (url: string) => void }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (...arg: any) => {
    //@ts-ignore
    onSelect.call(this, ...arg);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-3/4 max-w-5xl">
        <div className="h-full w-full">
          <ImagesPanel isModalView onSelect={handleSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePickerModal;
