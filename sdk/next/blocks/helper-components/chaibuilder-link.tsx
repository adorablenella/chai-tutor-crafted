import Link from "next/link";

const ChaiBuilderLink = ({
  inBuilder = false,
  _style = {},
  href,
  children,
}: {
  inBuilder?: boolean;
  _style?: object;
  href: string;
  children: any;
}) => {
  if (inBuilder) {
    return (
      <span data-simulate={"a"} {..._style}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} {..._style}>
      {children}
    </Link>
  );
};

export default ChaiBuilderLink;
