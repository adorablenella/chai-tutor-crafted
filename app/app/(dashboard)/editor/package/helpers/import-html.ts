// @ts-nocheck
import { parse, parseResultToJSON, serialize } from "forgiving-xml-parser";
import { filter, find, first, flatten, get, isEmpty, isString, map, trim, uniqueId } from "lodash";
import formatter from "html-formatter";

function getBlocksFromHTMLNodes(nodes, parentBlock) {
  // eslint-disable-next-line no-param-reassign
  nodes = filter(nodes, ({ type, content }) => type !== "text" || (isString(content) && !isEmpty(trim(content))));
  return flatten(map(nodes, (node) => getJSONForNode(node, parentBlock)));
}

const hasOnlyOneTextNode = (node) =>
  node.children && node.children.length === 1 && first(node.children).type === "text";

const isNodeEmpty = (node) => !node.children || isEmpty(node.children);

function getAdditionalProps(type, node, parentBlock) {
  const props = {};
  switch (type) {
    case "RawText":
      props.type = "Span";
      props.content = node.content;
      break;
    case "SVG":
      // eslint-disable-next-line no-case-declarations
      const svg = serialize(node).replace(/  +/gm, " ").replace(/\n|\r/gm, "");
      props.svg = svg;
      break;
    case "Image":
      props.url = get(find(node.attrs, { name: "src" }), "content", "");
      break;
    case "Input":
    case "TextArea":
      props.type = type;
      props.attrs = [
        { name: get(find(node.attrs, { name: "name" }), "content", "") },
        { placeholder: get(find(node.attrs, { name: "placeholder" }), "content", "") },
      ];
      break;
    case "Code":
    case "Text":
    case "Heading":
    case "Span":
    case "Button":
    case "Link":
    case "ListItem":
      if (hasOnlyOneTextNode(node)) {
        props.content = first(node.children).content;
      }
      if (type === "Heading") {
        props.level = parseInt(node.name.charAt(1), 10);
      }
      if (type === "Link") {
        props.link = "#";
      }
      if (type === "Span" && isNodeEmpty(node)) {
        props.type = "EmptyBox";
      }
      break;
    case "Box":
      props.tag = node.name;
      if (isNodeEmpty(node)) {
        props.type = "EmptyBox";
      }
      if (hasOnlyOneTextNode(node)) {
        props.type = "Text";
        props.content = first(node.children).content;
      }
      break;
    default:
  }

  props.parent = get(parentBlock, "id", null);
  return props;
}
function getJSONForNode(node, parentBlock) {
  if (node.type === "comment") return [];
  let block = { type: getNodeType(node), id: uniqueId("cloned-") };

  if (block.type !== "RawText") {
    block.classes = get(find(node.attrs, { name: "class" }), "content", "");
  }
  block = { ...block, ...getAdditionalProps(block.type, node, parentBlock) };
  const blocks = [block];
  if (node.name !== "svg" && node.name !== "img" && node.children && find(node.children, { type: "element" })) {
    return flatten([...blocks, ...getBlocksFromHTMLNodes(node.children, block)]);
  }
  return blocks;
}

function getNodeType(node) {
  if (node.type === "text") {
    return "RawText";
  }
  const name = get(node, "name", "");
  const tag = "Box";
  switch (name) {
    case "p":
      return "Text";
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return "Heading";
    case "hr":
      return "Line";
    case "span":
      return "Span";
    case "ul":
    case "ol":
      return "List";
    case "li":
      return "ListItem";
    case "a":
      return "Link";
    case "button":
      return "Button";
    case "svg":
      return "SVG";
    case "img":
      return "Image";
    case "form":
      return "Form";
    case "input":
      return "Input";
    case "textarea":
      return "TextArea";
    case "select":
      return "Select";
    case "option":
      return "Option";
    case "code":
      return "Code";
    case "br":
      return "LineBreak";
    default:
      return tag;
  }
}

function sanitizeHTML(response: string) {
  const matches = ` ${response}`.match(/`?``html([\s\S]*)```?/);
  const htmlString = matches ? matches[1].trim() : response;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const bodyTag = doc.querySelector("body");
  if (bodyTag) {
    return bodyTag.innerHTML;
  }
  return htmlString;
}

/**
 * Converts HTML to blocks array.
 * NOT added any tests and is flaky. Need to fix.
 * @param html
 * @returns {unknown[]|[{parent: null, classes: string, id: string, tag: string, type: string},{parent: string, classes: string, type: string, content: string}]}
 */
export function getHtmlToComponents(html: string) {
  // eslint-disable-next-line no-param-reassign
  html = sanitizeHTML(formatter.render(html));
  // eslint-disable-next-line no-param-reassign
  html = html.replace(/(\r\n|\n|\r)/gm, "").replace(/|[ ]{2,}/gm, "");
  const root = parseResultToJSON(parse(html), {
    allowAttrContentHasBr: true,
    allowNodeNameEmpty: true,
    allowNodeNotClose: false,
    allowStartTagBoundaryNearSpace: true,
    allowEndTagBoundaryNearSpace: true,
    allowTagNameHasSpace: false,
    allowNearAttrEqualSpace: true,
    ignoreTagNameCaseEqual: false,
  });
  if (root.error) {
    return [
      {
        type: "Box",
        classes: "",
        id: "some-error",
        parent: null,
        tag: "div",
      },
      {
        type: "Text",
        classes: "text-red-500 p-3",
        content: `${root.error.message}. Line: ${root.error.code}`,
        parent: "some-error",
      },
    ];
  }
  return getBlocksFromHTMLNodes(root.nodes, null);
}
