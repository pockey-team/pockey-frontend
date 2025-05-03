"use client";

import { useUserControllerGetUser } from "@/api/__generated__/index.query";

interface Props {
  id: string;
}

export const TestUser = ({ id }: Props) => {
  const { data } = useUserControllerGetUser(id);

  return (
    <p className="text-body-2">
      Test User from Client (id: {data?.data.id}, name: {data?.data.name})
    </p>
  );
};
