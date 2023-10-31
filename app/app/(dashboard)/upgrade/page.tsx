import { RenderBlocks } from "@/sdk/next";

export default function Page() {
  return <RenderBlocks model={"page"} slug={"upgrade-section"} domain={"new." + process.env.NEXT_PUBLIC_ROOT_DOMAIN} />;
}
