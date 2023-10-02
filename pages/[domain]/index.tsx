import { GetStaticProps } from "next";
import { fetchRouteSnapshot, RenderBlocks } from "@/sdk/next";
import { promises as fs } from "fs";
import path from "path";

export default function Main(snapshot: any) {
  return <RenderBlocks snapshot={snapshot} />;
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

async function getCustomBlocksSourceCode() {
  const customBlocks = await fs.readdir(path.join(process.cwd(), "custom-blocks"));
  // loop through the custom blocks and get the file contents
  return await Promise.all(
    customBlocks.map(async (block) => {
      return await fs.readFile(path.join(process.cwd(), "custom-blocks", block), "utf8");
    }),
  );
}
export const getStaticProps: GetStaticProps = async (context) => {
  const code = await getCustomBlocksSourceCode();
  const snapshot = await fetchRouteSnapshot("_home", context.params?.domain as string, code);
  return {
    props: snapshot,
  };
};
