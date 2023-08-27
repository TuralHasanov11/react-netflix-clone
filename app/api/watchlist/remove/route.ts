import { auth, isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  if (await isAuthenticated())
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });

  const { user } = await auth(request);

  try {
    const { movie_id } = await request.json();

    const movie = await dbClient.movie.findUnique({
      where: {
        id: movie_id,
      },
    });

    if (!movie)
      return NextResponse.json(
        { message: "Movie was not found!" },
        { status: 404 }
      );

    if (user.watchlist.includes(movie_id)) {
      const movieIndex = user.watchlist.indexOf(movie_id);
      user.watchlist.splice(movieIndex, 1);
      const updatedUser = await dbClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          watchlist: user.watchlist,
        },
      });

      return NextResponse.json(updatedUser);
    } else {
      return NextResponse.json(
        { message: "The movie is not in watch list" },
        { status: 422 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
