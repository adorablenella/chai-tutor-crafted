// @ts-ignore
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WidgetProps } from "@rjsf/utils";

const RichTextEditorField = ({ id, placeholder, value, onChange, onBlur }: WidgetProps) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }, { align: [] }],
      ["link", "clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "align",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      id={id}
      value={value}
      // @ts-ignore
      onBlur={(content: string) => onBlur(id, content)}
      onChange={(content: string) => onChange(content)}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className="mt-1 rounded-md"
    />
  );
};

export default RichTextEditorField;
