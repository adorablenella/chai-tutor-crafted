import React, { createContext, useCallback, useMemo } from "react";
import { flatten, has, intersection, map } from "lodash";
import { MultipleChoices } from "../choices/MultipleChoices";
import { BlockStyle } from "../choices/BlockStyle";
import { useSelectedBlockCurrentClasses } from "../../../hooks";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../../radix-ui";

export const basicUnits = ["px", "%", "em", "rem", "ch", "vh", "vw"];
const NestedOptions = ({ heading, items }: any) => {
  const currentClasses = useSelectedBlockCurrentClasses();
  const isAnyPropertySet: boolean = useMemo(() => {
    const getItemProperties = (it: any[]) =>
      flatten(
        it.map((item) => {
          if (item.styleType === "multiple") {
            return map(item.options, "key");
          }
          return item.property;
        })
      );
    const properties: Array<string> = flatten(
      items.map((item: any) => {
        if (item.styleType === "accordion") {
          return getItemProperties(item.items);
        }
        if (item.styleType === "multiple") {
          return map(item.options, "key");
        }
        return item.property;
      })
    );
    const setProps = map(currentClasses, "property");
    return intersection(properties, setProps).length > 0;
  }, [currentClasses, items]);
  return (
    <details>
      <summary className="my-px cursor-default rounded-md bg-gray-200 dark:bg-gray-800 p-px px-2 text-[11px] text-foreground">
        <div className="inline">
          {heading}
          {isAnyPropertySet ? (
            <span
              className={`mr-2 ml-1 inline-block h-[8px] w-[8px] rounded-full ${
                isAnyPropertySet ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ) : null}
        </div>
      </summary>
      <div className="p-2">
        {items.map((item: any) => {
          if (item.styleType === "multiple") {
            return <MultipleChoices key={item.label} {...item} />;
          }
          return <BlockStyle key={item.label} {...item} />;
        })}
      </div>
    </details>
  );
};

const SectionContext = createContext({});

export const SettingsSection = ({ section }: any) => {
  const currentClasses = useSelectedBlockCurrentClasses();

  const matchCondition = useCallback(
    (conditions: any = []): boolean => {
      const active: any = {};
      for (let i = 0; i < currentClasses.length; i++) {
        active[currentClasses[i].property] = currentClasses[i].cls;
      }
      let match = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const property in conditions) {
        if (!has(active, property) || active[property] !== conditions[property]) {
          match = false;
          break;
        }
      }
      return match;
    },
    [currentClasses]
  );

  const isAnyPropertySet: boolean = useMemo(() => {
    if (currentClasses.length > 0 && section.heading === "Classes") {
      return true;
    }
    const getItemProperties = (items: any[]) =>
      flatten(
        items.map((item) => {
          if (item.styleType === "multiple") {
            return flatten(map(item.options, "key"));
          }
          return item.property;
        })
      );
    const properties: Array<string> = flatten(
      section.items.map((item: any) => {
        if (item.styleType === "accordion") {
          return getItemProperties(item.items);
        }
        if (item.styleType === "multiple") {
          return flatten(map(item.options, "key"));
        }
        return item.property;
      })
    );
    const setProps = map(currentClasses, "property");
    return intersection(properties, setProps).length > 0;
  }, [currentClasses, section.heading, section.items]);

  const contextValue = useMemo(() => ({}), []);

  return (
    <SectionContext.Provider value={contextValue}>
      <AccordionItem value={section.heading}>
        <AccordionTrigger className="text-xs px-3 py-2 hover:no-underline">
          <div className="flex items-center gap-x-2">
            <div className={`h-[8px] w-[8px] rounded-full ${isAnyPropertySet ? "bg-blue-500" : "bg-gray-300"}`} />
            {section.heading}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-3.5 py-2 bg-gray-100">
          {React.Children.toArray(
            section.items.map((item: any) => {
              if (has(item, "component")) {
                return React.createElement(item.component, { key: item.label });
              }
              if (!has(item, "styleType")) {
                return <BlockStyle key={item.label} {...item} />;
              }
              if (item.styleType === "multiple") {
                return <MultipleChoices key={item.label} {...item} />;
              }
              if (item.styleType === "accordion" && matchCondition(item?.conditions)) {
                return <NestedOptions key={item.label} {...item} />;
              }
              return null;
            })
          )}
        </AccordionContent>
      </AccordionItem>
    </SectionContext.Provider>
  );
};
