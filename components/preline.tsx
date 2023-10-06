"use client";

import { useEffect } from "react";

export const Preline = () => {
  useEffect(() => {
    // @ts-ignore
    import("preline");
  }, []);
  return null;
};
