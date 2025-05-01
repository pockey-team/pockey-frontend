"use client";

import { useUserControllerGetUser } from "@/api/__generated__";

export const TestUser = ({ id }: { id: string }) => {
  const { data } = useUserControllerGetUser(id);

  return (
    <p className="font text-2xl tracking-tight">
      Test User (src: {id}, id: {data?.data.id}, name: {data?.data.name})
    </p>
  );
};
