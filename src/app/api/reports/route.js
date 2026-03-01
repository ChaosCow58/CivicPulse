import { createReport, getReports } from "@/app/actions"
import prisma from "@/lib/prisma"
import { redirect, RedirectType } from "next/navigation";
import { NextServer } from "next/dist/server/next";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const {
            type,
            severity,
            latitude,
            longitude,
            description
        } = await req.formData();

        const report = await createReport({
            type,
            severity,
            latitude,
            longitude,
            description
        });

        redirect("/map");
    } catch (error) {
        console.error("Error creating report:", error)
        return new NextResponse(JSON.stringify({ error: "Failed to create report" }), { status: 500 })
    }
}

export async function GET() {
    try {
        const reports = await getReports();
        return NextResponse.json(reports, { status: 200 });
    } catch (error) {
        console.error("Error fetching reports:", error)
        return new NextResponse(JSON.stringify({ error: "Failed to fetch reports" }), { status: 500 })
    }
}
