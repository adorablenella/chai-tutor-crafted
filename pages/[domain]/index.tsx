import { GetStaticProps } from "next";
import { fetchRouteSnapshot, RenderBlocks } from "@/sdk/next";

export default function Main(snapshot: any) {
  return <RenderBlocks snapshot={snapshot} />;
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await fetchRouteSnapshot("_home", context.params?.domain as string);
  return {
    props: snapshot,
  };
};
