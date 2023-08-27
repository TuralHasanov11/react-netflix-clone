import httpClient from "@/lib/httpClient";
import useSwr from "swr";

export default function useMovie(id: string) {
  const { data, error, isLoading } = useSwr(
    `/api/movies/${id}`,
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
