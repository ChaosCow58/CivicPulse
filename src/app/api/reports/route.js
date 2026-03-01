import { createReport, getReports } from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.json();

        const report = await createReport({
            type: formData.type,
            severity: Number(formData.severity),
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),
            description: formData.issueDescription,
        });

        return Response.json({ ok: true });
    } catch (error) {
        console.error("Error creating report:", error);

        return NextResponse.json(
            { error: "Failed to create report" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const reports = await getReports();
        return NextResponse.json(reports);

    } catch (error) {
        console.error("Error fetching reports:", error);

        return NextResponse.json(
            { error: "Failed to fetch reports" },
            { status: 500 }
        );
    }
}