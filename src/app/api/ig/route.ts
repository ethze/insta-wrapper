import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const key = searchParams.get("key");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    if (key !== process.env.API_KEY) {
      return NextResponse.json({ error: "Invalid API Key" }, { status: 403 });
    }

    const res = await fetch("https://instagram120.p.rapidapi.com/api/instagram/userInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "instagram120.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      },
      body: JSON.stringify({ username }), 
    });

    if (!res.ok) {
      const text = await res.text(); // ambil response body untuk debugging
      return NextResponse.json(
        { error: `Failed to fetch user: ${res.status} - ${text}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // A-Z
    const sortedData: Record<string, unknown> = {};
    Object.keys(data)
      .sort((a, b) => a.localeCompare(b))
      .forEach((k) => (sortedData[k] = data[k]));

    return NextResponse.json({ data: sortedData }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

