import React, { useCallback, useMemo } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import useUser from "@/hooks/useUser";
import httpClient from "@/lib/httpClient";
import useWatchList from "@/hooks/useWatchList";

interface WatchListProps {
  movieId: string;
}

export default function WatchListButton({ movieId }: WatchListProps) {
  const { mutate: mutateWatchList } = useWatchList();

  const { data: user, mutate } = useUser();

  const inWatchList = useMemo(() => {
    return user?.watchlist && user?.watchlist.includes(movieId);
  }, [user, movieId]);

  const toggleWatchList = useCallback(async () => {
    const data = { movie_id: movieId };

    const response = await httpClient.POST(
      `/api/watchlist/${inWatchList ? "remove" : "add"}`,
      data
    );

    const updatedWatchList = response?.data?.watchlist;

    mutate({
      ...user,
      watchlist: updatedWatchList,
    });
    mutateWatchList();
  }, [movieId, inWatchList, user, mutate, mutateWatchList]);

  const Icon = inWatchList ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggleWatchList}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
}
