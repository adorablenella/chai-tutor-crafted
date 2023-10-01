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

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await fetchRouteSnapshot(
    `${(context.params?.slug as string[])?.join("/")}`,
    context.params?.domain as string,
  );
  // if not found, return 404
  if (snapshot.notFound) {
    return {
      notFound: true,
    };
  }
  return { props: snapshot };
};
