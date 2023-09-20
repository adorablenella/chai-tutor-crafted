import React, { LazyExoticComponent, Suspense } from "react";
import { Languages } from "./Languages";
import { Separator } from "../../radix/components/ui/separator";
import { SaveButton } from "./SaveButton";
import { useBuilderProp } from "../../hooks/useBuilderProp";
import { Skeleton } from "../../radix/components/ui/skeleton";

export default () => {
  const leftComponents: LazyExoticComponent<any>[] = useBuilderProp("topBarComponents.left", []);
  const centerComponents: LazyExoticComponent<any>[] = useBuilderProp("topBarComponents.center", []);
  const rightComponents: LazyExoticComponent<any>[] = useBuilderProp("topBarComponents.right", []);
  return (
    <div className="h-14 flex items-center justify-between px-2">
      <div className="flex space-x-2 items-center">
        <div className="flex items-center font-bold space-x-2">
          {React.Children.toArray(
            leftComponents.map((Component) => (
              <Suspense fallback={<Skeleton className="h-10" />}>
                <Component />
              </Suspense>
            ))
          )}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        {React.Children.toArray(
          centerComponents.map((Component) => (
            <Suspense fallback={<Skeleton className="h-10" />}>
              <Component />
            </Suspense>
          ))
        )}
      </div>
      <div className="flex space-x-2 items-center">
        <Languages />
        <Separator orientation="vertical" />
        <SaveButton />
        {React.Children.toArray(
          rightComponents.map((Component) => (
            <Suspense fallback={<Skeleton className="h-10" />}>
              <Component />
            </Suspense>
          ))
        )}
      </div>
    </div>
  );
};
