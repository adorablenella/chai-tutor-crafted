import React, { useCallback } from "react";
import { useThrottledCallback } from "@react-hookz/web";
import { get, isNaN, isNull, startsWith } from "lodash";
import { useTranslation } from "react-i18next";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "../../radix-ui";
import BlockSettings from "./BlockSettings";
import BlockStyling from "./BlockStyling";
import { BlockSettingsContext } from "./SettingsContext";
import { useSelectedBlock } from "../../hooks/useSelectedBlockIds";

const MAPPER: { [key: string]: number } = {
  px: 1,
  "%": 1,
  em: 100,
  rem: 100,
  ch: 1,
  vw: 1,
  vh: 1,
  "-": 1,
  deg: 1,
  ms: 0.1,
};

const Settings: React.FC = () => {
  const selectedBlock = useSelectedBlock();
  const { t } = useTranslation();
  const [draggedVal, setDraggedVal] = React.useState<any>("");
  const [dragData, setDragData] = React.useState({
    onDrag: (value: string) => value,
    onDragEnd: (value: string) => value,
    dragStartY: 0,
    dragging: false,
    dragStartValue: 0,
    dragUnit: "",
    negative: false,
    cssProperty: "",
  });

  const updateStyle = useThrottledCallback(
    (e: any) => {
      const onlyPositive = !get(dragData, "negative", false);
      const property = get(dragData, "cssProperty", "");
      let currentValue = parseFloat(dragData.dragStartValue as any);
      currentValue = isNaN(currentValue) ? 0 : currentValue;

      let divider = MAPPER[dragData.dragUnit];
      if (startsWith(property, "scale") || property === "opacity") {
        divider = 10;
      }

      const draggedPx = dragData.dragStartY - e.pageY;
      let value = draggedPx / divider + currentValue;
      if (onlyPositive && value < 0) {
        value = 0;
      }

      if (property === "opacity" && value > 1) {
        value = 1;
      }

      dragData.onDrag(`${value}`);
      setDraggedVal(`${value}`);
    },
    [dragData],
    50
  );

  const dragStopped = useCallback(() => {
    setTimeout(() => dragData.onDragEnd(`${draggedVal}`), 100);
    setDragData({
      onDrag: (value) => value,
      onDragEnd: (value) => value,
      dragStartY: 0,
      dragging: false,
      dragStartValue: 0,
      dragUnit: "",
      negative: false,
      cssProperty: "",
    });
  }, [dragData, draggedVal, setDragData]);

  if (isNull(selectedBlock))
    return (
      <div className="p-4 text-center">
        <div className="space-y-4 rounded-xl p-4">
          <MixerHorizontalIcon className="mx-auto text-3xl" />
          <h1>{t("no_block_selected_for_styling")}</h1>
        </div>
      </div>
    );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <BlockSettingsContext.Provider value={{ setDragData }}>
      {dragData.dragging ? (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onMouseMove={updateStyle}
          onMouseUp={() => {
            dragStopped();
          }}
          className="absolute inset-0 z-30 cursor-row-resize bg-gray-300/10 "
        />
      ) : null}

      <Tabs defaultValue="settings" className="flex flex-col h-full w-full py-1">
        <TabsList className="grid grid-cols-2 mx-1">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="flex-1 overflow-y-auto">
          <ScrollArea className="h-full overflow-x-hidden no-scrollbar -mx-1">
            <BlockSettings />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="styling" className="flex-1 overflow-y-auto overflow-x-hidden">
          <BlockStyling />
        </TabsContent>
      </Tabs>
    </BlockSettingsContext.Provider>
  );
};

export default Settings;
