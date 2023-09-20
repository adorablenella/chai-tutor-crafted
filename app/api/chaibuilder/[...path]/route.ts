import { NextResponse } from "next/server";
import {
  chaiBuilderDELETEHandler,
  chaiBuilderGETHandler,
  chaiBuilderPOSTHandler,
  chaiBuilderPUTHandler,
} from "@/sdk/next/api-handlers";

export async function GET(...args: any) {
  // @ts-ignore
  const { response, status = 200 } = await chaiBuilderGETHandler(...args);
  return NextResponse.json(response, { status });
}

export async function POST(...args: any[]) {
  // @ts-ignore
  return NextResponse.json(chaiBuilderPOSTHandler(...args));
}

export async function PUT(...args: any[]) {
  // @ts-ignore
  return NextResponse.json(chaiBuilderPUTHandler(...args));
}

export async function DELETE(...args: any[]) {
  // @ts-ignore
  return NextResponse.json(chaiBuilderDELETEHandler(...args));
}
