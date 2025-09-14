import { NextRequest, NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const key = searchParams.get("key");

    // check if username is provided, kalau nggak return error
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // validate API key, must match env key
    if (key !== process.env.API_KEY) {
      return NextResponse.json({ error: "Invalid API Key" }, { status: 403 });
    }

    const ig = new IgApiClient();
    // generate device state from IG username, penting biar login nggak error
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
    const sortedUser: Record<string, any> = {};
    Object.keys(rawUser)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sortedUser[key] = rawUser[key];
      });

    // return both important info & full sorted data
    return NextResponse.json(
      {
        // important, // tampil duluan biar cepat dibaca
        data: sortedUser, // full raw sorted A-Z
      },
      { status: 200 }
    );
  } catch (err: any) {
    // catch any error and return 500
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

