// @ts-ignore
import { parse, stringify } from "himalaya";
import { generateUUID } from "../functions/functions";
import { capitalize, filter, find, flatMapDeep, flatten, forEach, get, includes, isEmpty, omit, set } from "lodash";
import { TBlock } from "../types";
import { STYLES_KEY } from "@/sdk/package/constants/CONTROLS";
import { cn } from "../radix/lib/utils";

type Node = {
  type: "element" | "text" | "comment";
  tagName: string;
  attributes: Array<Record<string, string>>;
  children: Node[];
};

const ATTRIBUTE_MAP: Record<string, Record<string, string>> = {
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
  input: {
    placeholder: "_placeholder",
    required: "_required",
    type: "_inputType",
  },
  textarea: {
    placeholder: "_placeholder",
    required: "_required",
    type: "_inputType",
  },
  select: {
    placeholder: "_placeholder",
    required: "_required",
    multiple: "_multiple",
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
    includes(["Heading", "Paragraph", "Span", "ListItem", "Button", "Label", "TableCell", "Link"], block._type)
  );
};

/**
 *
 * @param nodes
 * @returns from list of nested nodes extractiong only text type content
 */
const getTextContent = (nodes: Node[]): string => {
  return nodes
    .map((node) => {
      if (node.type === "text") return get(node, "content", "");
      else if (!isEmpty(node.children)) return getTextContent(node.children);
      return "";
    })
    .join("");
};

/**
 *
 * @param value
 * @returns For boolean attributes without content marking true and passing if value is null
 */
const getSanitizedValue = (value: any) => (value === null ? true : value);

/**
 *
 * @returns Mapping Attributes as per blocks need from @ATTRIBUTE_MAP and rest passing as it is
 * @param node
 */
const getAttrs = (node: Node) => {
  let attrs: Record<string, string> = {};
  const replacers = ATTRIBUTE_MAP[node.tagName] || {};
  const attributes: Array<{ key: string; value: string }> = node.attributes as any;

  forEach(attributes, ({ key, value }) => {
    if (replacers[key]) {
      // for img tag if the src is not absolute then replace with placeholder image
      if (node.tagName === "img" && key === "src" && !value.startsWith("http")) {
        const width = find(node.attributes, { key: "width" }) as { value: string } | undefined;
        const height = find(node.attributes, { key: "height" }) as { value: string } | undefined;
        if (width && height) {
          value = `https://via.placeholder.com/${width?.value}x${height?.value}`;
        } else {
          value = `https://via.placeholder.com/150x150`;
        }
      }
      set(attrs, replacers[key], getSanitizedValue(value));
    } else if (!includes(["style", "class", "srcset"], key)) {
      set(attrs, `_attrs.${key}`, getSanitizedValue(value));
    }
  });

  delete attrs.class;
  return attrs;
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
      return { _type: "Image" };
    case "input":
      return { _type: "Input", _showLabel: false }; // _showLabel: hiding default block label
    case "hr":
      return { _type: "Divider" };
    case "br":
      return { _type: "LineBreak" };
    case "textarea":
      return { _type: "TextArea", _showLabel: false };
    case "audio":
      return { _type: "Audio" };
    case "iframe":
      return { _type: "Iframe" };
    case "canvas":
      return { _type: "Canvas" };
    case "video":
      return { _type: "CustomHTML" };
    case "svg":
      return { _type: "Icon" };

    // non self closing tags
    // fixed structure
    case "select":
      return { _type: "Select", _options: [] };
    case "option":
      return { _type: "Option" };
    case "ul":
    case "ol":
    case "dl":
      return {
        _type: "List",
        _tag: node.tagName,
        _listType: node.tagName === "ol" ? "list-decimal" : "list-none",
      };
    case "li":
    case "dt":
      return { _type: "ListItem", _tag: node.tagName };

    // non self closing tags
    // free flow structure
    case "span":
    case "figcaption":
    case "legend":
      return { _type: "Span", _tag: node.tagName };
    case "p":
      return { _type: "Paragraph", _content: "" };
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
    case "tbody":
      return { _type: "TableBody" };
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

/**
 *
 * @param nodes
 * @param parent { block, node }
 * @returns Traversing all nodes one by one and mapping there style, attribute and block type
 */
const traverseNodes = (nodes: Node[], parent: any = null): TBlock[] => {
  return flatMapDeep(nodes, (node: Node) => {
    // * Ignoring code comment nodes
    if (node.type === "comment") return [];

    // * Generating block id and setting parent id if nested
    let block: Partial<TBlock> = { _id: generateUUID() };
    if (parent) block._parent = parent.block._id;

    /**
     * @handling_text_content
     * Checking if parent exist
     * If parent has only one children and current node type is text
     * checking does parent block type support _content
     * setting parent _content to current node text content
     * returning empty node
     */
    if (node.type === "text") {
      if (isEmpty(get(node, "content", ""))) return [] as any;
      if (parent) {
        if (shouldAddText(parent.node, parent.block)) {
          set(parent, "block._content", get(node, "content", ""));
          return [] as TBlock[];
        }
      }
      return { ...block, _type: "Text", _content: get(node, "content", "") };
    }

    // * Adding default block props, default attrs and default style
    block = { ...block, ...getBlockProps(node), ...getAttrs(node), ...getStyles(node) };

    if (block._type === "Input") {
      /**
       * hanlding input tag mapping type to input type
       * setting block _type to non-standard inputs like checkbox, radio, range, file
       */
      const inputType = block._inputType || "text";
      if (inputType === "checkbox") set(block, "_type", "Checkbox");
      else if (inputType === "radio") set(block, "_type", "Radio");
    } else if (node.tagName === "video") {
      /**
       * video element to custom html block
       */
      block._content = stringify([node]);
      return [block] as TBlock[];
    } else if (node.tagName === "svg") {
      /**
       * handling svg tag
       * if svg tag just pass html stringify content as _icon
       */

      const svgHeight = find(node.attributes, { key: "height" });
      const svgWidth = find(node.attributes, { key: "width" });
      const height = get(svgHeight, "value") ? `[${get(svgHeight, "value")}px]` : "full";
      const width = get(svgWidth, "value") ? `[${get(svgWidth, "value")}px]` : "full";
      const svgClass = get(find(node.attributes, { key: "class" }), "value");
      block._styles = `${STYLES_KEY}, ${cn(`w-${width} h-${height}`, svgClass)}`.trim();

      node.attributes = filter(node.attributes, (attr) => !includes(["style", "width", "height", "class"], attr.key));
      block._icon = stringify([node]);
      block._attrs = omit(block._attrs, ["height", "width", "style", "class"]);
      return [block] as TBlock[];
    } else if (node.tagName == "option" && parent && parent.block?._type === "Select") {
      /**
       * mapping select options as underscore options
       * for label extracting string from all option child and mapping all attributes
       */
      parent.block._options.push({ label: getTextContent(node.children), ...getAttrs(node) });
      return [] as any;
    }

    const children = traverseNodes(node.children, { block, node });
    return [block, ...children] as TBlock[];
  });
};

/**
 *
 * @param html
 * @returns sanitizing html content
 */
const getSanitizedHTML = (html: string) => {
  // * Checking if having body tag then converting it to div and using that as root
  const bodyContent = html.match(/<body[^>]*>[\s\S]*?<\/body>/);
  const htmlContent =
    bodyContent && bodyContent.length > 0
      ? bodyContent[0].replace(/<body/, "<div").replace(/<\/body>/, "</div>")
      : html;

  // * Replacing script and unwanted whitespaces and nextline
  return htmlContent
    .replace(/\s+/g, " ")
    .replaceAll("> <", "><")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .trim();
};

/**
 *
 * @param html
 * @returns Blocks JSON
 */
export const getBlocksFromHTML = (html: string): TBlock[] => {
  const nodes: Node[] = parse(getSanitizedHTML(html));
  if (isEmpty(html)) return [];
  return flatten(traverseNodes(nodes)) as TBlock[];
};
