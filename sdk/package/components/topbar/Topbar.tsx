import React, { LazyExoticComponent, Suspense } from "react";
import { Languages } from "./Languages";
import { Separator } from "../../radix/components/ui/separator";
import { SaveButton } from "./SaveButton";
import { useBuilderProp } from "../../hooks/useBuilderProp";
import { Skeleton } from "../../radix/components/ui/skeleton";
import { SubdomainLink } from "./SubdomainLink";

const Topbar = () => {
  const leftComponents: LazyExoticComponent<any>[] = useBuilderProp("topBarComponents.left", []);
  const centerComponents: LazyExoticComponent<any>[] = useBuilderProp("topBarComponents.center", []);
  const rightComponents: LazyExoticComponent<any>[] = useBuilderProp("topBarComponents.right", []);

  return (
    <div className="flex h-14 items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 font-bold">
          {React.Children.toArray(
            leftComponents.map((Component) => (
              <Suspense fallback={<Skeleton className="h-10" />}>
                <Component />
              </Suspense>
            )),
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {React.Children.toArray(
          centerComponents.map((Component) => (
            <Suspense fallback={<Skeleton className="h-10" />}>
              <Component />
            </Suspense>
          )),
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Languages />
        <Separator orientation="vertical" />
        <SubdomainLink />
        <SaveButton />
        {React.Children.toArray(
          rightComponents.map((Component) => (
            <Suspense fallback={<Skeleton className="h-10" />}>
              <Component />
            </Suspense>
          )),
        )}
      </div>
    </div>
  );
};

export default Topbar;
