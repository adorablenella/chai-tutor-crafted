import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
} from "@/sdk/package/radix-ui";

const ConfirmAlert = ({
  open,
  onCancel = () => {},
  onConfirm,
  title,
  description,
  disabled,
  cancelText = "Discard",
  confirmText = "Save",
}: {
  cancelText?: string | React.ReactElement;
  confirmText?: string | React.ReactElement;
  description?: string | React.ReactElement;
  disabled: boolean;
  onCancel?: React.MouseEventHandler;
  onConfirm: React.MouseEventHandler;
  open: boolean;
  title: string | React.ReactElement;
}) => (
  <AlertDialog open={open}>
    <AlertDialogContent>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
      <div className="flex items-center justify-end gap-x-3">
        <AlertDialogCancel disabled={disabled} onClick={onCancel}>
          {cancelText}
        </AlertDialogCancel>
        <Button variant="default" onClick={onConfirm} disabled={disabled}>
          {confirmText}
        </Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>
);

export default ConfirmAlert;
