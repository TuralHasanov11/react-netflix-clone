import Hero from "@/components/Hero";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useWatchList from "@/hooks/useWatchList";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: watchlist = [] } = useWatchList();

  const movieListContainer = [
    { title: "Trending Now", data: movies },
    { title: "My List", data: watchlist },
  ];

  return (
    <>
      <Hero />
      <div className="pb-40">
        {movieListContainer.map((item) => (
          <MovieList key={item.title} title={item.title} data={item.data} />
        ))}
      </div>
    </>
  );
}
