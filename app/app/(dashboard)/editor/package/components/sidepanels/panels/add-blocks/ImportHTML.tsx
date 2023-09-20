import { useState } from "react";
import { useAtom } from "jotai/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../radix/components/ui/card";
import { Label } from "../../../../radix/components/ui/label";
import { Textarea } from "../../../../radix/components/ui/textarea";
import { Button } from "../../../../radix/components/ui/button";
import { useAddBlock, useAddBlockParent } from "../../../../hooks";
import { getHtmlToComponents } from "../../../../helpers/import-html";
import { addBlockOffCanvasAtom } from "../../../../store/ui";

const ImportHTML = () => {
  const [code, setCode] = useState("");
  const { addPredefinedBlock } = useAddBlock();
  const [parentId, setParentId]: any = useAddBlockParent();
  const [, setOpen] = useAtom(addBlockOffCanvasAtom);
  const importComponents = () => {
    const blocks = getHtmlToComponents(code);
    addPredefinedBlock([...blocks], parentId);
    setCode("");
    setParentId(null);
    setOpen(false);
  };

  return (
    <Card className="border-border/0">
      <CardHeader className="p-3">
        <CardTitle>Import HTML</CardTitle>
        <CardDescription>
          Use HTML snippets from component libraries like Tailwind UI, Flowbite, Preline, Kitwind, Tailblocks etc. or
          just copy paste your own HTML code.
          <p>Only Tailwind CSS markup is supported.</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-3">
        <div className="space-y-1">
          <Label htmlFor="current">Enter HTML Code:</Label>
          <Textarea ref={(el) => el && el.focus()} onChange={(evt) => setCode(evt.target.value)} rows={5} />
        </div>
      </CardContent>
      <CardFooter className="p-3">
        <Button disabled={code.trim() === ""} onClick={() => importComponents()} size="sm">
          Import
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImportHTML;
