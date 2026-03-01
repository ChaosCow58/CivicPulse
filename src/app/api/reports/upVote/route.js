import { NextResponse } from "next/server";
import { increaseReportVote } from "@/app/actions"

export async function POST(req) {
    try {
        const formData = await req.json();

        await increaseReportVote(formData.id);

        return NextResponse.json({ ok: true });
        
    } catch (error) {
        console.error("Error up voting report:", error);

        return NextResponse.json(
            { error: "Failed to up vote report" },
            { status: 500 }
        );
    }
}