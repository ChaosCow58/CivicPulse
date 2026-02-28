// lib/auth.js
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/app/actions";

export const auth0 = new Auth0Client({
  signInReturnToPath: "/dashboard",

  onCallback: async (error, context, session) => {
    if (error) {
      return NextResponse.redirect(
        new URL("/", process.env.APP_BASE_URL)
      );
    }

    getOrCreateUser(session);

    return NextResponse.redirect(
      new URL(context.returnTo || "/dashboard", process.env.APP_BASE_URL)
    );
  },
});