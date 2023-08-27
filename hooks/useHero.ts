import httpClient from "@/lib/httpClient";
import useSwr from "swr";

export default function useHero() {
  const { data, error, isLoading } = useSwr(
    "/api/movies/random",
    httpClient.GET,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
}
