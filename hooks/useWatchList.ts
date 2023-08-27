import httpClient from "@/lib/httpClient";
import useSWR from "swr";

export default function useWatchList() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/watchlist",
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
    mutate,
  };
}
