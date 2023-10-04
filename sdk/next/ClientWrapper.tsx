"use client";

import "../../custom-blocks/Navbar";

import { CLIENT_BLOCKS } from "@/sdk/next/CLIENT_BLOCKS";
import React from "react";

export const ClientWrapper = (props: any) => {
  return CLIENT_BLOCKS[props._type] ? React.createElement(CLIENT_BLOCKS[props._type], props) : null;
};
