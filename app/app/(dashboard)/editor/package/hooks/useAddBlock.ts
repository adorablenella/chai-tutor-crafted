import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { filter, find, first, forIn, has, startsWith } from "lodash";
import { useDispatch } from "./useTreeData";
import { presentBlocksAtom } from "../store/blocks";
import { generateUUID } from "../functions/functions";
import { canAddChildBlock } from "../functions/Layers";
import { useBuildingBlocks } from "./useBuildingBlocks";
import { mergeGlobalBlockIntoPageBlocks } from "../functions/Blocks";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { TBlock } from "../types/TBlock";
import { CoreBlock } from "../types/CoreBlock";
import { getBlockDefaultProps } from "../functions/controls";
import { SLOT_KEY } from "../constants/CONTROLS";

type AddBlocks = {
  addCoreBlock: Function;
  addPredefinedBlock: Function;
};

export const useAddBlock = (): AddBlocks => {
  const dispatch = useDispatch();
  const presentBlocks = useAtomValue(presentBlocksAtom);
  const [, globalBlocks] = useBuildingBlocks();
  const [, setSelected] = useSelectedBlockIds();
  // const [primaryLang] = usePrimaryLanguage();

  const addCoreBlock = useCallback(
    (coreBlock: CoreBlock, parentId?: string) => {
      if (has(coreBlock, "blocks")) {
        const blocks = coreBlock.blocks as TBlock[];
        dispatch({ type: "set_blocks", payload: [...presentBlocks, ...blocks] });
        setSelected(blocks[0]._id);
        return true;
      }

      const blockId = generateUUID();
      const props: { [key: string]: any } = getBlockDefaultProps(coreBlock.props);
      const slots: TBlock[] = [];
      forIn(props, (value: any, key) => {
        if (startsWith(value, SLOT_KEY)) {
          const slotId = value.replace(SLOT_KEY, "");
          slots.push({
            _id: slotId,
            _type: "Slot",
            _parent: blockId,
            _name: coreBlock.props[key].name,
            styles: coreBlock.props[key].styles,
          });
        }
      });
      // const translations: { [path: string]: any } = getBlockDefaultTranslations(
      //   coreBlock.props,
      //   blockId,
      //   primaryLang,
      //   []
      // );

      // TODO: check for #slots and generate slot blocks
      // TODO: add languages to translations
      const newBlock: any = {
        _type: coreBlock.type,
        _id: blockId,
        ...props,
      };
      let parentBlock;
      if (parentId) {
        parentBlock = find(presentBlocks, { _id: parentId }) as TBlock;
        newBlock._parent = parentId;
      }
      const canAdd = parentBlock ? canAddChildBlock(parentBlock._type) : true;
      if (!canAdd && parentBlock) {
        newBlock._parent = parentBlock._parent;
      }
      const newBlocks: TBlock[] = [newBlock, ...slots];
      dispatch({ type: "set_blocks", payload: [...presentBlocks, ...newBlocks] });
      setSelected([newBlock._id]);
      return true;
    },
    [presentBlocks, dispatch, setSelected]
  );

  const addPredefinedBlock = useCallback(
    (blocks: TBlock[], parentId?: string) => {
      // eslint-disable-next-line no-param-reassign
      blocks = mergeGlobalBlockIntoPageBlocks(globalBlocks, blocks) as TBlock[];
      for (let i = 0; i < blocks.length; i++) {
        const { _id } = blocks[i];
        // eslint-disable-next-line no-param-reassign
        blocks[i]._id = generateUUID();
        if (i === 0) {
          // eslint-disable-next-line no-param-reassign
          blocks[i]._parent = parentId;
        }
        const children = filter(blocks, { _parent: _id });
        for (let j = 0; j < children.length; j++) {
          children[j]._parent = blocks[i]._id;
        }
      }
      dispatch({ type: "set_blocks", payload: [...presentBlocks, ...blocks] });
      setSelected([first(blocks)?._id]);
    },
    [presentBlocks, dispatch, setSelected, globalBlocks]
  );

  return { addCoreBlock, addPredefinedBlock };
};
