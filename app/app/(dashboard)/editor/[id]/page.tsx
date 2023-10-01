"use client";
import ChaiBuilderNextJS from "@/sdk/next";
import "@/custom-blocks";

export default function Editor() {
  return (
    <div className={"h-screen w-screen"}>
      <ChaiBuilderNextJS />
    </div>
  );
}
