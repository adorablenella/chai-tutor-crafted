// @ts-ignore
import { parse, stringify } from "himalaya";
import { generateUUID } from "../functions/functions";
import _, { capitalize, find, flatMapDeep, flatten, forEach, get, includes, isEmpty, last, set } from "lodash";
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

const attributeMap: Record<string, Record<string, string>> = {
  img: { alt: "_alt", width: "_width", height: "_height", src: "_image" },
  video: {
    src: "_url",
    autoplay: "_controls.autoPlay",
    muted: "_controls.muted",
    loop: "_controls.loop",
    controls: "_controls.controls",
  },
  a: {
    href: "_link.href",
    target: "_link.target",
    type: "", // @TODO: Detect here what to url, email, phone, elementId
  },
};

/**
 *
 * @param node
 * @param block
 * @returns Condition add text as _content
 */
const shouldAddText = (node: Node, block: any) => {
  return (
    node.children.length === 1 &&
    includes(["Heading", "Paragraph", "Span", "ListItem", "Button", "Label", "TableCell"], block._type)
  );
};

/**
 *
 * @param value
 * @returns For boolean attributes without content marking true and passing if value is null
 */
const getSanitizedValue = (value: any) => (value === null ? true : value);

/**
 *
 * @param attributes
 * @param replacers
 * @returns Mapping Attributes as per blocks need from @attributeMap and rest passing as it is
 */
const mapAttributes = (attributes: any, replacers: Record<string, string> = {}) => {
  let attrs: Record<string, string> = {};
  forEach(attributes as Array<{ key: string; value: string }>, ({ key, value }) => {
    if (replacers[key]) set(attrs, replacers[key], getSanitizedValue(value));
    else set(attrs, key, getSanitizedValue(value));
  });
  delete attrs.class;
  return attrs;
};

const getAttrs = (node: Node): Record<string, string> => {
  switch (node.tagName) {
    case "img":
    case "hr":
    case "br":
    case "video":
    case "a":
      return mapAttributes(node.attributes, attributeMap[node.tagName] || {});
    default:
      return mapAttributes(node.attributes, {});
  }
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
      return { _type: "LineBreak", ...getStyles(node), ...getAttrs(node) };
    case "textarea":
      return { _type: "Textarea" };
    case "audio":
      return { _type: "Audio" };
    case "iframe":
      return { _type: "Iframe" };
    case "canvas":
      return { _type: "Canvas" };
    case "video":
      return { _type: "Video", ...getStyles(node), ...getAttrs(node) };
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
      return {
        _type: "List",
        _tag: node.tagName,
        _listType: node.tagName === "ol" ? "list-decimal" : "list-disc",
        ...getStyles(node),
        ...getAttrs(node),
      };
    case "li":
    case "dt":
      return { _type: "ListItem", _tag: node.tagName, ...getStyles(node), ...getAttrs(node) };

    // non self closing tags free flow structure
    case "span":
    case "figcaption":
    case "legend":
      return { _type: "Span", _tag: node.tagName, ...getStyles(node), ...getAttrs(node) };
    case "p":
      return { _type: "Paragraph", ...getStyles(node), ...getAttrs(node) };
    case "a":
      return { _type: "Link", ...getStyles(node), ...getAttrs(node) };
    case "form":
      return { _type: "Form" };
    case "label":
      return { _type: "Label" };
    case "button":
      return { _type: "Button", ...getStyles(node), ...getAttrs(node) };
    case "code":
      return { _type: "Code" };
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return { _type: "Heading", _tag: node.tagName, ...getStyles(node), ...getAttrs(node) };
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
        ...getStyles(node),
        ...getAttrs(node),
      };
  }
};

let parentBlock: any[] = [];

const traverseNodes = (nodes: Node[], parent: string | null = null): TBlock[] => {
  return flatMapDeep(nodes, (node: Node) => {
    if (node.type === "comment") {
      return [];
    }
    let block: Partial<TBlock> = { _id: generateUUID() };
    if (parent) {
      block._parent = parent;
    }

    /**
     * @handling_text_content
     * 1. Checking if parent exist
     * 2. If parent has only one children and current node type is text
     * 3. checking does parent block type support _content
     * 4. setting parent _content to current node text content
     * 5. destroying current node
     */
    if (node.type === "text") {
      if (parentBlock.length > 0) {
        const parent = last(parentBlock);
        if (shouldAddText(parent.node, parent.block)) {
          set(parent, "block._content", get(node, "content", ""));
          return [] as any;
        }
      }
      return { ...block, _type: "Text", content: get(node, "content", ""), ...getStyles(node) };
    }

    block = { ...block, ...getBlockProps(node) };

    /**
     * @handling_svg_tag
     * if svg tag just pass html stringify content as _icon
     */
    if (node.tagName === "svg") {
      block._icon = stringify([node]);
      return [block] as TBlock[];
    }
    parentBlock.push({ block, node });
    const children = traverseNodes(node.children, block._id);
    parentBlock.pop();
    return [block, ...children] as TBlock[];
  });
};

const getBlocksFromHTML = (html: string): TBlock[] => {
  const nodes: Node[] = parse(html);
  if (isEmpty(html)) return [];
  parentBlock = [];
  const blocks = flatten(traverseNodes(nodes)) as TBlock[];
  return blocks;
};

const HTML =
  `<a href="www.google.com" class="flex items-center border-2 border-black rounded-full px-3 gap-x-1 text-black">
    Hello
    <svg class="text-white"
         height="10"
         width="10"
         viewBox="0 0 10 10"
         focusable="false">
        <path d="m1 7h8v2h-8zm0-3h8v2h-8zm0-3h8v2h-8z"/>
    </svg>
</a>`
    .replace(/\s+/g, " ")
    .replaceAll("> <", "><");

describe("getBlocksFromHTML", () => {
  const result = getBlocksFromHTML(HTML);
  it("should return an empty array when given an empty string", () => {
    const result = getBlocksFromHTML("");
    expect(result).toEqual([]);
  });

  // it("should return an array of blocks when given valid HTML", () => {
  //   const html = HTML;
  //   const result = getBlocksFromHTML(html);
  // expect(result).toEqual([
  //   {
  //     _id: expect.any(String),
  //     _type: "Box",
  //     tag: "div",
  //   },
  //   {
  //     _id: expect.any(String),
  //     _type: "Paragraph",
  //     _parent: expect.any(String),
  //     content: "Hello, world!",
  //     styles: "#styles:,px-2",
  //   },
  // ]);
  // });
});
