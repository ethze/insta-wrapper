import { NextRequest, NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const key = searchParams.get("key");

    // check if username is provided
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // validate API key
    if (key !== process.env.API_KEY) {
      return NextResponse.json(
        { error: "Invalid API Key" },
        { status: 403 }
      );
    }

    const ig = new IgApiClient();
    // generate device state from IG username
    ig.state.generateDevice(process.env.IG_USERNAME as string);

    // login to Instagram using credentials from env
    await ig.account.login(
      process.env.IG_USERNAME as string,
      process.env.IG_PASSWORD as string
    );

    // get pk (primary key) from username
    const user = await ig.user.searchExact(username);

    // fetch full raw user info dari IG API
    const response = await ig.request.send({
      url: `/api/v1/users/${user.pk}/info/`,
      method: "GET",
    });

    const rawUser = response.body.user;

    // --- SORT ALL KEYS A-Z untuk full data ---
    const sortedUser: Record<string, unknown> = {};
    Object.keys(rawUser)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sortedUser[key] = rawUser[key];
      });

    // return full sorted data
    return NextResponse.json(
      {
        data: sortedUser,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    // handle error safely
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

