import { Metadata } from "next";

const title = "Chai Builder - Multipurpose Tailwind CSS Builder";
const description = "Chai Builder - Multipurpose Tailwind CSS Builder";
const image =
  "https://ik.imagekit.io/n0uvizrukm2/chaibuilder_com/Xnapper-2023-10-19-08.56.08_q20cxDCRQ.jpg?updatedAt=1697686023798";
export const metadata: Metadata = {
  title,
  description,
  icons: ["https://ik.imagekit.io/n0uvizrukm2/chai-builder-logo-b-w_s_VR37ggn.png?updatedAt=1692613727383"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@chaibuilder",
  },
  metadataBase: new URL("https://chaibuilder.com"),
};

function isProductionEnv() {
  return process.env.NODE_ENV === "production";
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
