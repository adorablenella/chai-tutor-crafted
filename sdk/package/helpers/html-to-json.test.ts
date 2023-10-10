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
    case "div":
    case "header":
    case "footer":
    case "main":
    case "section":
    case "article":
    case "aside":
    case "nav":
      return { tag: node.tagName, _type: "Box", ...getStyles(node, "styles") };
    case "p":
      return { _type: "Paragraph", ...getStyles(node, "styles") };
    default:
      return {};
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
        block = { ...block, _type: "Paragraph" };
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
