import React from "react";

type TPanelProps = {
  children: React.ReactNode;
  heading: React.ReactNode;
};

export const Panel = ({ heading, children }: TPanelProps) => (
  <div className="relative h-full">
    <div className="bg-background/30 p-1 rounded-md">{heading}</div>
    <div className="px-1">{children}</div>
  </div>
);
