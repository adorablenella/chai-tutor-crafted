import { NextResponse } from "next/server";
import supabase from "@/app/helpers/supabase";

export async function POST(request: any) {
  const body = await request.json();
  const transaction = {
    user: body.user,
    transaction_data: body.transactionData,
  };
  const {} = await supabase.from("transactions").insert(transaction);
  // @ts-ignore
  return NextResponse.json({ success: true, body }, { status: 200 });
}
