import { each, filter, find, includes, isNull, map, pick, sortBy } from "lodash";
import { ClassDerivedObject, constructClassObject } from "./Class";

const MEDIA_QUERIES: any = {
  xs: 420,
  sm: 620,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
const breakpoints: string[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

/**
 *
 * @param existingClasses
 * @param classObj
 */
export function getBelongsToForClass(
  existingClasses: ClassDerivedObject[],
  classObj: ClassDerivedObject | null
): string {
  if (classObj === null) {
    return "baseClasses";
  }
  const setFor: string = classObj.mq;
  if (setFor === "xs" || classObj.dark || classObj.mod !== "") {
    return "classes";
  }

  let belongsTo = "baseClasses";
  let breakpointIndex: number = breakpoints.indexOf(setFor);
  while (breakpointIndex > 0) {
    const mqToCheck = breakpoints[breakpointIndex - 1];
    const classToCheck = find(existingClasses, {
      mq: mqToCheck,
      property: classObj.property,
    });
    if (classToCheck) {
      belongsTo = "classes";
      break;
    }
    breakpointIndex--;
  }

  return belongsTo;
}

const IGNORED_BASES_CLASSES_PROPERTIES: string[] = [];

/**
 * Returns the new classes that need to be added to the class object
 *
 * @param existingClasses
 * @param baseClasses
 * @param newClasses
 */
export function getNewClasses(existingClasses = "", baseClasses = "", newClasses: string[] = []): string {
  // sanitize the strings
  // eslint-disable-next-line no-param-reassign
  existingClasses = existingClasses.trim().replace(/  +/g, "");

  let existingClassesObjects: any = filter(
    map(existingClasses.split(" "), constructClassObject),
    (o: any) => !isNull(o)
  );
  let baseClassesObjects: any = filter(map(baseClasses.split(" "), constructClassObject), (o: any) => !isNull(o));

  // adding this to remove layout base classes from already existing base classes
  baseClassesObjects = filter(
    baseClassesObjects,
    (baseCls: any) => !includes(IGNORED_BASES_CLASSES_PROPERTIES, baseCls.property)
  );

  const newClassesArr: Array<any> = [];
  const newBaseClassesArr: Array<any> = [];

  each(newClasses, (newClass: string) => {
    const newClassObject = constructClassObject(newClass) as ClassDerivedObject;
    const toRemove = find(existingClassesObjects, pick(newClassObject, ["dark", "mq", "mod", "property"]));
    if (toRemove) {
      existingClassesObjects = filter(
        existingClassesObjects,
        (c: { fullCls: string }) => c.fullCls !== toRemove?.fullCls
      );
    }
    newClassesArr.push(newClassObject);
    // remove the same property from baseClasses if newclass mq is set for XS = all breakpoints
    if (newClassObject.mq === "xs" && !newClassObject.dark && newClassObject.mod === "") {
      baseClassesObjects = filter(baseClassesObjects, (o: any) => o.property !== newClassObject.property);
    }

    // if the new class is a base class, remove it from the newClassesArr
    if (
      getBelongsToForClass(existingClassesObjects, newClassObject) === "baseClasses" &&
      !includes(IGNORED_BASES_CLASSES_PROPERTIES, newClassObject.property)
    ) {
      const needToRemove = find(baseClassesObjects, pick(newClassObject, ["property"]));
      if (toRemove) {
        baseClassesObjects = filter(
          baseClassesObjects,
          (c: { fullCls: string }) => c.fullCls !== needToRemove?.fullCls
        );
      }
      newBaseClassesArr.push({
        ...newClassObject,
        fullCls: newClassObject.cls,
        mq: "xs",
      });
    }
  });

  const classes: string = map(
    sortBy([...existingClassesObjects, ...newClassesArr], (cls: { mq: string }) => MEDIA_QUERIES[cls.mq]),
    "fullCls"
  ).join(" ");

  const baseClassesStr: string = map(
    sortBy([...baseClassesObjects, ...newBaseClassesArr], (cls: { mq: string }) => MEDIA_QUERIES[cls.mq]),
    "fullCls"
  ).join(" ");

  return `${baseClassesStr.trim()},${classes.trim()}`.trim().replace(/  +/g, "");
}

/**
 * Handle Dynamic Classes for headless UI blocks
 * @param dynamicClasses
 * @param newClasses
 */
export function getNewDynamicClasses(dynamicClasses = "", newClasses: string[] = []): string {
  // sanitize the strings
  // eslint-disable-next-line no-param-reassign
  dynamicClasses = dynamicClasses.trim().replace(/  +/g, "");

  let existingClassesObjects: any = filter(
    map(dynamicClasses.split(" "), constructClassObject),
    (o: any) => !isNull(o)
  );

  const newClassesArr: Array<any> = [];

  each(newClasses, (newClass: string) => {
    const newClassObject = constructClassObject(newClass) as ClassDerivedObject;
    const toRemove = find(existingClassesObjects, pick(newClassObject, ["dark", "mod", "property"]));
    if (toRemove) {
      existingClassesObjects = filter(
        existingClassesObjects,
        (c: { fullCls: string }) => c.fullCls !== toRemove?.fullCls
      );
    }
    newClassesArr.push(newClassObject);
  });

  return map([...existingClassesObjects, ...newClassesArr], "fullCls").join(" ");
}
