import React, { Attributes } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useUpdateBlocksPropsRealtime } from "../hooks/useUpdateBlocksProps";

type BubbleEditorProps = {
  attrs: Attributes;
  content: string;
  id: string;
  propKey: string;
};

const BubbleEditor = ({ content, propKey, id, attrs }: BubbleEditorProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(content);
  const updateRealTime = useUpdateBlocksPropsRealtime();

  const handleEditorChange = (v: string) => {
    setValue(v);
    updateRealTime(id, { [propKey]: value });
  };

  return isEditing ? (
    <div {...attrs}>
      <ReactQuill modules={[]} theme="bubble" value={value} onChange={handleEditorChange} />
    </div>
  ) : (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div {...attrs} onClick={() => setIsEditing(true)} dangerouslySetInnerHTML={{ __html: value }} />
  );
};

export default BubbleEditor;
