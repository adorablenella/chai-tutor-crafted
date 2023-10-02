import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(...args: any) {
  const customBlocks = await fs.readdir(path.join(process.cwd(), "custom-blocks"));
  // loop through the custom blocks and get the file contents
  const customBlocksCode = await Promise.all(
    customBlocks.map(async (block) => {
      return await fs.readFile(path.join(process.cwd(), "custom-blocks", block), "utf8");
    }),
  );
  return NextResponse.json({ code: customBlocksCode }, { status: 200 });
}
