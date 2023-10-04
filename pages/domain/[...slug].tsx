import { GetStaticProps } from "next";
import { fetchRouteSnapshot, RenderBlocks } from "@/sdk/next";

export default function Page(snapshot: any) {
  return <RenderBlocks snapshot={snapshot} />;
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

async function getCustomBlocksSourceCode(): Promise<string[]> {
  // const customBlocks = await fs.readdir(path.join(process.cwd(), "custom-blocks"));
  // // loop through the custom blocks and get the file contents
  // return await Promise.all(
  //   customBlocks.map(async (block) => {
  //     return await fs.readFile(path.join(process.cwd(), "custom-blocks", block), "utf8");
  //   }),
  // );
  return [];
}
export const getStaticProps: GetStaticProps = async (context) => {
  const code = await getCustomBlocksSourceCode();
  const snapshot = await fetchRouteSnapshot(
    `${(context.params?.slug as string[])?.join("/")}`,
    context.params?.domain as string,
    code,
  );
  // if not found, return 404
  if (snapshot.notFound) {
    return {
      notFound: true,
    };
  }
  return { props: snapshot };
};
