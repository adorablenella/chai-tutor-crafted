// @ts-ignore
import { parse } from "himalaya";
import { generateUUID } from "../functions/functions";
import { capitalize, find, flatMapDeep, flatten } from "lodash";
import { TBlock } from "../types";
import { STYLES_KEY } from "@/sdk/package/constants/CONTROLS";

type Node = {
  type: "element" | "text" | "comment";
  tagName: string;
  attributes: Record<string, string>;
  children: Node[];
};

const typeMapping: Record<string, string> = {
  div: "Box",
  p: "Paragraph",
};

const getAttrs = (node: Node): { [_attrs: string]: Record<string, string> } => {
  return { _attrs: { id: "one", role: "blockquote" } };
};

const getStyles = (node: Node, propKey: string = "_styles"): Record<string, string> => {
  if (!node.attributes) return { [propKey]: `${STYLES_KEY},` };
  // @ts-ignore
  const classAttr = find(node.attributes, { key: "class" }) as { value: string } | undefined;
  if (classAttr) {
    const styleString = classAttr.value;
    return { [propKey]: `${STYLES_KEY},${styleString}` };
  }
  return { [propKey]: `${STYLES_KEY},` };
};

const getBlockProps = (node: Node): Record<string, any> => {
  switch (node.tagName) {
    // self closing tags
    case "img":
      return { _type: "Image", ...getStyles(node), ...getAttrs(node) };
    case "input":
      return { _type: "Input", ...getStyles(node), ...getAttrs(node) };
    case "hr":
      return { _type: "Divider", ...getStyles(node), ...getAttrs(node) };
    case "br":
      return { _type: "LineBreak" };
    case "textarea":
      return { _type: "Textarea" };
    case "audio":
      return { _type: "Audio" };
    case "iframe":
      return { _type: "Iframe" };
    case "canvas":
      return { _type: "Canvas" };
    case "video":
      return { _type: "Video" };
    case "svg":
      return { _type: "Icon" };
    case "progress":
      return { _type: "Progress" };

    // non self closing tags
    // non self closing tags fixed structure
    case "select":
      return { _type: "Select" };
    case "option":
      return { _type: "Option" };
    case "ul":
    case "ol":
    case "dl":
      return { _type: "List", _tag: node.tagName };
    case "li":
    case "dt":
      return { _type: "ListItem", _tag: node.tagName };

    // non self closing tags free flow structure
    case "span":
    case "figcaption":
    case "legend":
      return { _type: "Span", _tag: node.tagName };
    case "p":
      return { _type: "Paragraph" };
    case "a":
      return { _type: "Link" };
    case "form":
      return { _type: "Form" };
    case "label":
      return { _type: "Label" };
    case "button":
      return { _type: "Button" };
    case "code":
      return { _type: "Code" };
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return { _type: "Heading", _tag: node.tagName };
    case "table":
      return { _type: "Table" };
    case "tr":
      return { _type: "TableRow" };
    case "td":
    case "th":
      return { _type: "TableCell", _tag: node.tagName };
    case "thead":
      return { _type: "TableHead" };
    case "tfoot":
      return { _type: "TableFooter" };

    default:
      return {
        _tag: node.tagName,
        _type: "Box",
        _name: node.tagName === "div" ? "Box" : capitalize(node.tagName),
      };
  }
};

const traverseNodes = (nodes: Node[], parent: string | null = null): TBlock[] => {
  return flatMapDeep(nodes, (node: Node) => {
    if (node.type === "comment") {
      return [];
    }
    let block: Partial<TBlock> = { _id: generateUUID() };
    if (parent) {
      block._parent = parent;
    }
    block = { ...block, ...getBlockProps(node) };
    const children = traverseNodes(node.children, block._id);
    return [block, ...children] as TBlock[];
  });
};

const getBlocksFromHTML = (html: string): TBlock[] => {
  const nodes: Node[] = parse(html);
  // console.log(JSON.stringify(nodes));
  const blocks = flatten(traverseNodes(nodes)) as TBlock[];
  return blocks;
};

describe("getBlocksFromHTML", () => {
  xit("should return an empty array when given an empty string", () => {
    const result = getBlocksFromHTML("");
    expect(result).toEqual([]);
  });

  it("should return an array of blocks when given valid HTML", () => {
    const html = "<div><p class='px-2'>Hello, world!</p></div>";
    const result = getBlocksFromHTML(html);
    expect(result).toEqual([
      {
        _id: expect.any(String),
        _type: "Box",
        tag: "div",
      },
      {
        _id: expect.any(String),
        _type: "Paragraph",
        _parent: expect.any(String),
        content: "Hello, world!",
        styles: "#styles:,px-2",
      },
    ]);
  });
});
