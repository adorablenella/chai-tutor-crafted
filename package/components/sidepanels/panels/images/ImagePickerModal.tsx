import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../../..";
import ImagesPanel from "./ImagesPanel";

const ImagePickerModal = ({ children, onSelect }: { children: React.JSX.Element; onSelect: (url: string) => void }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (...arg) => {
    onSelect.call(this, ...arg);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-3/4 flex max-w-5xl">
        <div className="w-full h-full">
          <ImagesPanel isModalView onSelect={handleSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePickerModal;
