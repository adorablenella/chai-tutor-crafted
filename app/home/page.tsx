import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <Image
        width={512}
        height={512}
        src="https://ik.imagekit.io/n0uvizrukm2/chai-builder-logo-b-w_s_VR37ggn.png?updatedAt=1692613727383"
        alt="Platforms on Vercel"
        className="w-48"
      />
      <h1 className="text-white">Home Page is working fine</h1>
    </div>
  );
}
