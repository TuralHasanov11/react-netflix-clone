import { auth, isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  if (await isAuthenticated())
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  const { user } = await auth(request);

  try {
    // use pagination
    const movies = dbClient.movie.findMany({
      where: {
        id: {
          in: user?.watchlist,
        },
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
