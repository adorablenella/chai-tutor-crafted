import { captureFormSubmission } from "@/sdk/next/api-handlers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // @ts-ignore
  const { response, status = 200 } = await captureFormSubmission(request);
  // @ts-ignore
  return NextResponse.json(response, { status });
}
