// lib/auth.js
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/app/actions";
import { redirect } from "next/navigation";

export const auth0 = new Auth0Client({
    signInReturnToPath: "/map",

    onCallback: async (error, context, session) => {
        if (error) {
            return NextResponse.redirect(
                new URL("/", process.env.APP_BASE_URL)
            );
        }

        getOrCreateUser(session);

        return NextResponse.redirect(
            new URL(context.returnTo || "/map", process.env.APP_BASE_URL)
        );
    },
});

export async function isAuthenticated(request) {
    const session = await auth0.getSession(request);

    if (!session) {
        redirect("/auth/login");
    }

    return session;
}