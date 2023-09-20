/**
  export <RenderBlocks snapshot={}/>,
  type ChaiBuilderPageSnapshot
  */
import ChaiBuilderNextJS from "./ChaiBuilderNextJS";
import { chaiBuilderApiHandler } from "./api-handlers";
import { RenderBlocks } from "./RenderBlocks";
import { fetchRouteSnapshot } from "./api-handlers/fetchRouteSnapshot";
import { fetchRouteGlobalData } from "./api-handlers/fetchRouteGlobalData";

export default ChaiBuilderNextJS;
export { chaiBuilderApiHandler, RenderBlocks, fetchRouteSnapshot, fetchRouteGlobalData };
