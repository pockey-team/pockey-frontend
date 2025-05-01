"use client";

import { useUserControllerGetUser } from "@/api/__generated__";

interface Props {
  id: string;
}

export const TestUser = ({ id }: Props) => {
  const { data } = useUserControllerGetUser(id);

  return (
    <p className="font text-2xl tracking-tight">
      Test User from Client (id: {data?.data.id}, name: {data?.data.name})
    </p>
  );
};
