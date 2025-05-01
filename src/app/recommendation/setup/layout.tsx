"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { RelationForm } from "@/components/recommendation/setup/relation-form";
import { RelationData } from "@/types/recommendation/setup";

export default function RecommendationSetupLayout({
  children,
}: PropsWithChildren) {
  const router = useRouter();

  const handleNext = (data: RelationData) => {
    const searchParams = new URLSearchParams(data);
    router.push(`/recommendation/setup/budget?${searchParams.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto w-full max-w-md">
        <header className="relative px-4 py-4">
          <button
            type="button"
            className="rounded bg-gray-800 px-2 py-1 text-sm text-white"
            onClick={() => router.back()}
          >
            뒤로
          </button>
        </header>
        <div>
          <Image
            src="/static/images/recommendation-setup-placeholder.png"
            alt="Recommendation Setup Placeholder"
            sizes="100vw"
            width={390}
            height={160}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
        <RelationForm onSubmit={handleNext} />
        {children}
      </div>
    </div>
  );
}
