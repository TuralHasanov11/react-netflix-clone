import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params: { movieId } }: { params: { movieId: string } }
) {
  if (await isAuthenticated())
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  try {
    const movie = dbClient.movie.findUnique({
      where: { id: movieId },
    });

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
