import httpClient from "@/lib/httpClient";
import useSWR from "swr";

export default function useMovieList() {
  const { data, error, isLoading } = useSWR("/api/movies", httpClient.GET, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
}
