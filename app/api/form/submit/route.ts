import { captureFormSubmission } from "@/sdk/next/api-handlers";
import { NextResponse } from "next/server";

export async function POST(...args: any[]) {
  // @ts-ignore
  const { response, status = 200 } = await captureFormSubmission(...args);
  return NextResponse.json(response, { status });
}
