import {NextResponse} from "next/server";
import {
    chaiBuilderDELETEHandler,
    chaiBuilderGETHandler,
    chaiBuilderPOSTHandler,
    chaiBuilderPUTHandler
} from "../../../app/(dashboard)/editor/next/api-handlers";

export async function GET(...args: any) {
    // @ts-ignore
    return NextResponse.json(chaiBuilderGETHandler(...args))
}

export async function POST(...args: any[]) {
    // @ts-ignore
    return NextResponse.json(chaiBuilderPOSTHandler(...args))
}

export async function PUT(...args: any[]) {
    // @ts-ignore
    return NextResponse.json(chaiBuilderPUTHandler(...args))
}

export async function DELETE(...args: any[]) {
    // @ts-ignore
    return NextResponse.json(chaiBuilderDELETEHandler(...args))
}