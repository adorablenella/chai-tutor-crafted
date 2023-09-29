"use client";

import cn from "clsx";
import Image from "next/image";
import type { ComponentProps } from "react";
import { useState } from "react";

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={cn(props.className, "duration-700 ease-in-out", isLoading ? "scale-105 blur-md" : "scale-100 blur-0")}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
