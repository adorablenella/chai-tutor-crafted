import { omit } from "lodash";

/**
 * attribute received while importing other than default handled
 */
export const getRestProps = (rest?: any) => {
  return omit(rest, [
    "children",
    "inBuilder",
    "blockProps",
    "index",
    "_id",
    "_type",
    "_styles",
    "_showLabel",
    "_checked",
    "_required",
    "_inputStyles",
    "_label",
    "_content",
    "_parent",
  ]);
};
