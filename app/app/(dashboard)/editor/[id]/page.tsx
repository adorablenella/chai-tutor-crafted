import ChaiBuilderNextJS from "@/sdk/next";

export default function Editor({ params }: { params: { id: string } }) {
  return (
    <div className={"h-screen w-screen"}>
      <ChaiBuilderNextJS />
    </div>
  );
}
