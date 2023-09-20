import { get, isEmpty, map, startsWith } from "lodash";
import { MODIFIERS } from "../constants/MODIFIERS";
import { CLASSES_LIST } from "../constants/CLASSES_LIST";

export type ClassDerivedObject = {
  cls: string;
  dark: boolean;
  fullCls: string;
  mod: string;
  mq: string;
  property: string;
};

/**
 * Returns the media query for the given class:w
 * @param cls
 */
export function getMqForCls(cls: string): string {
  if (isEmpty(cls.trim())) return "";
  const match = cls.match(/sm:|md:|lg:|xl:|2xl:/g);
  return get(match, 0, "xs").replace(":", "");
}

/**
 * Returns the modifier for the given class
 * @param cls
 */
export function getModForCls(cls: string) {
  const expression = map(MODIFIERS, (mod: string) => `${mod}:`).join("|");
  const modifierRegEx = new RegExp(expression, "g");
  return get(modifierRegEx.exec(cls.trim()), 0, "").replace(":", "");
}

/**
 * Returns the pure class name of the given class
 * Ex: hover:scale-105 returns scale-105
 * @param cls
 */
export function getPureClsName(cls: string): string {
  const pureClsName = cls.trim().split(":").pop();
  return pureClsName || "";
}

/**
 * Returns the css property for the given class name
 * @param pureCls
 */
const memoizedProps: { [cls: string]: string } = {};

export function getPropertyForClass(pureCls: string): string {
  if (isEmpty(pureCls)) return "";
  // check if memoized
  if (memoizedProps[pureCls]) {
    return memoizedProps[pureCls];
  }
  let property: string = "";
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in CLASSES_LIST) {
    const expression = get(CLASSES_LIST, `${key}.regExp`, "") as string;
    if (new RegExp(expression, "g").test(pureCls)) {
      property = key;
      memoizedProps[pureCls] = property;
      break;
    }
  }
  return property;
}

export function constructClassObject(cls: string): ClassDerivedObject | null {
  if (isEmpty(cls)) return null;
  return {
    dark: startsWith(cls, "dark:"),
    mq: getMqForCls(cls),
    mod: getModForCls(cls),
    cls: getPureClsName(cls),
    fullCls: cls,
    property: getPropertyForClass(cls),
  };
}

export function generateFullClsName(clsObj: ClassDerivedObject) {
  let fullCls: string = "";
  if (clsObj.dark) {
    fullCls += "dark:";
  }
  if (clsObj.mq.toLowerCase() !== "xs") {
    fullCls += `${clsObj.mq}:`;
  }
  if (clsObj.mod) {
    fullCls += `${clsObj.mod}:`;
  }
  fullCls += clsObj.cls;
  return fullCls;
}
