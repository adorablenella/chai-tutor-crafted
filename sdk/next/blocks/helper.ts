import { omit } from "lodash";

/**
 * attribute received while importing other than default handled
 */
export const getRestProps = (rest?: any) => {
  return omit(rest, ["children", "_id", "inBuilder", "_type", "blockProps", "_styles", "index"]);
};
