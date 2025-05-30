"use client";

import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import { useState } from "react";
import { productControllerGetProduct } from "@/api/__generated__";
import type { ProductData } from "@/app/recommendation/share/[id]/page";

interface NextPickProps {
  ids: number[];
  session: Session | null;
}

export const NextPick = ({ ids, session }: NextPickProps) => {
  const [errorImageIds, setErrorImageIds] = useState<Set<number>>(new Set());

  const handleImageError = (id: number) => {
    setErrorImageIds((prev) => new Set([...prev, id]));
  };

  const nextPickQueries = useQueries<ProductData[]>({
    queries: ids.map((id) => ({
      queryKey: ["product", id],
      queryFn: () =>
        productControllerGetProduct(id, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }),
      enabled: !!id,
    })),
  });
  const nextPickResults = nextPickQueries
    .filter((query) => query.isSuccess && query.data)
    .map((query) => {
      const response = query.data;
      // @ts-ignore
      return response?.data as unknown as ProductData;
    });
  return (
    <div className="grid grid-cols-3 gap-8px">
      {nextPickResults.map((result) => (
        <Link key={result.name} href={result?.url} target="_blank">
          <div className="flex flex-col items-center justify-center gap-8px">
            <div className="h-[108px] w-[108px] overflow-hidden rounded-2xl">
              {errorImageIds.has(result?.id) ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500" />
              ) : (
                <Image
                  src={result?.imageUrl}
                  alt={result?.name}
                  width={108}
                  height={108}
                  className="h-full w-full object-cover"
                  onError={() => handleImageError(result?.id)}
                  style={{ width: "108px", height: "108px" }}
                />
              )}
            </div>
            <p className="line-clamp-1 w-[108px] text-center font-medium text-[12px] text-gray-200">
              {result?.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
