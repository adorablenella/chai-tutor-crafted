import { GlobeIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../../../../radix/components/ui/button";
import { useMarkAsGlobalBlock } from "../../../../hooks";
import { capitalize } from "lodash";

const MarkAsGlobalBlock = ({ id = null, closeModal }: { id: string | null; closeModal: () => void }) => {
  const markAsGlobal = useMarkAsGlobalBlock();
  const [name, setName] = useState("");

  return (
    <>
      <h1 className="text-lg font-bold">Mark as Global</h1>
      <div className={"py-2 text-sm"}>
        Note: Global blocks are single instances. Editing global blocks will be reflected on all pages using these
        blocks. <br />
        <ul className={"mt-4 list-inside list-disc space-y-1"}>
          <li>
            Global blocks are indicated with <GlobeIcon className="inline" /> icon in left sidebar
          </li>
          <li>{`Global blocks are available under "Global" category`}</li>
        </ul>
      </div>
      <div className={"my-4"}>
        <label className={"block text-sm font-medium text-gray-400"}>Enter global block name</label>
        <input
          placeholder={"Eg: Header, Footer "}
          className={"mt-2 w-full"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end gap-x-4">
        <Button
          onClick={() => {
            // @TODO: UPDATE THIS
            markAsGlobal(id, capitalize(name));
            closeModal();
          }}
          disabled={name.length <= 2}
          variant="default">
          Mark as Global
        </Button>
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default MarkAsGlobalBlock;
