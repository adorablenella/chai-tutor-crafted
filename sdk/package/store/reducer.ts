import { isEmpty, set } from "lodash";
import undoable, { excludeAction } from "redux-undo";
import { TBlock } from "../types/TBlock";

// @ts-ignore
export const pageBlocksReducer: any = undoable(
  // eslint-disable-next-line default-param-last
  (state: TBlock[] = [], action: any) => {
    switch (action.type) {
      case "add_new_blocks":
      case "add_duplicate_blocks":
        return [...state, ...action.payload];
      case "create_snapshot":
        return [...state];
      case "set_blocks":
      case "set_page_blocks":
        return [...action.payload];
      case "update_props":
      case "update_props_realtime":
        // eslint-disable-next-line no-case-declarations
        const { payload } = action;
        return state.map((block) => {
          if (payload.ids.includes(block._id) && !isEmpty(action.payload.props)) {
            Object.keys(action.payload.props).forEach((key) => {
              set(block, key, action.payload.props[key]);
            });
          }
          return block;
        });
      default:
        return state;
    }
  },
  {
    debug: false,
    ignoreInitialState: false,
    limit: 30,
    filter: excludeAction(["update_props_realtime", "add_duplicate_blocks", "set_page_blocks"]),
  },
);
