import { createReport } from "@/app/actions"
import prisma from "@/lib/prisma"

export async function GET(request) {
    await createReport({
        type: "road_issue",
        severity: 3,
        latitude: 40.7128,
        longitude: -74.0060
    });

    return new Response("Report created");
}