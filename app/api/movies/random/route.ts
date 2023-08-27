import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  if (await isAuthenticated())
    NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const moviesCount = await dbClient.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await dbClient.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
