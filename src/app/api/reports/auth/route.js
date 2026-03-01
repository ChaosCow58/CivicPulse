import { isAPIAuthenticated } from '@/lib/auth';

export async function GET(request) {
    const session = await isAPIAuthenticated(request);
    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    return Response.json({ ok: true });
}