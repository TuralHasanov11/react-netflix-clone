import httpClient from "@/lib/httpClient";
import useSWR from "swr";

export default function useUser() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/user",
    httpClient.GET
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
