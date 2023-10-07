import { Metadata } from "next";
import Script from "next/script";

const title = "Chai Builder - Multipurpose Tailwind CSS Builder";
const description = "Chai Builder - Multipurpose Tailwind CSS Builder";
const image = "https://vercel.pub/thumbnail.png";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Script src={"https://preline.co/assets/vendor/preline/preline.js"} />
      </body>
    </html>
  );
}
