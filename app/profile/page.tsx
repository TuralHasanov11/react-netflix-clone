import useUser from "@/hooks/useUser";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserCardProps {
  username: string;
}

function UserCard({ username }: UserCardProps) {
  const imgSrc = "/images/default-blue.png";

  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <Image
          draggable={false}
          className="w-max h-max object-contain"
          src={imgSrc}
          alt="Default Profile Image"
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {username}
      </div>
    </div>
  );
}

export default function Profile() {
  const router = useRouter();

  const { data: user } = useUser();

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard username={user?.username} />
          </div>
        </div>
      </div>
    </div>
  );
}
