// @ts-ignore
import { parse } from "himalaya";
import { generateUUID } from "../functions/functions";
import { find, flatMapDeep, flatten } from "lodash";
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

const getStyles = (node: Node, propKey: string): Record<string, string> => {
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
      return { _type: "Image", ...getStyles(node, "styles") };
    case "input":
      return { _type: "Input", ...getStyles(node, "styles") };
    case "hr":
      return { _type: "Line", ...getStyles(node, "styles") };
    case "br":
      return { _type: "LineBreak", ...getStyles(node, "styles") };
    case "textarea":
      return { _type: "Textarea", ...getStyles(node, "styles") };
    case "audio":
      return { _type: "Audio", ...getStyles(node, "styles") };
    case "iframe":
      return { _type: "Iframe", ...getStyles(node, "styles") };
    case "canvas":
      return { _type: "Canvas", ...getStyles(node, "styles") };
    case "video":
      return { _type: "Video", ...getStyles(node, "styles") };

    // non self closing tags
    // non self closing tags fixed structure
    case "select":
      return { _type: "Select", ...getStyles(node, "styles") };
    case "option":
      return { _type: "Option", ...getStyles(node, "styles") };
    case "ul":
    case "dl":
      return { _type: "List", ...getStyles(node, "styles") };
    case "li":
    case "ol":
    case "dt":
      return { _type: "ListItem", ...getStyles(node, "styles") };

    // non self closing tags free flow structure
    case "p":
      return { _type: "Paragraph", ...getStyles(node, "styles") };
    case "a":
      return { _type: "Link", ...getStyles(node, "styles") };
    case "form":
      return { _type: "Form", ...getStyles(node, "styles") };
    case "button":
      return { _type: "Button", ...getStyles(node, "styles") };
    case "code":
      return { _type: "Code", ...getStyles(node, "styles") };
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return { _type: "Heading", ...getStyles(node, "styles") };
    case "table":
      return { _type: "Table", ...getStyles(node, "styles") };
    case "tr":
      return { _type: "TableRow", ...getStyles(node, "styles") };
    case "td":
    case "th":
      return { _type: "TableCell", ...getStyles(node, "styles") };
    case "thead":
      return { _type: "TableHead", ...getStyles(node, "styles") };
    case "tfoot":
      return { _type: "TableFooter", ...getStyles(node, "styles") };

    default:
      return { tag: node.tagName, _type: "Box", ...getStyles(node, "styles") };
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
    switch (node.type) {
      case "element":
        block = { ...block, ...getBlockProps(node) };
        break;
      case "text":
        block = { ...block, _type: "Paragraph", _parent: undefined, _bindings: {} };
        break;
      default:
        break;
    }
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
