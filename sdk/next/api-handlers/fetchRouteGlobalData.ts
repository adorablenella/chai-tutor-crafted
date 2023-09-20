import { GetStaticPropsContext } from "next";

export const fetchRouteGlobalData = async (ctx: GetStaticPropsContext<any>) => ({ slug: ctx.params?.slug ?? [] });
