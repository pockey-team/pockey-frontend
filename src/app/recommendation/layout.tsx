"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@/components/shared/react-hook-form-dev-tool";
import { recommendationSetupFormSchema } from "@/types/recommendation/setup";

export default function RecommendationSetupLayout({
  children,
}: PropsWithChildren) {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(recommendationSetupFormSchema),
  });

  return (
    <>
      <FormProvider {...form}>{children}</FormProvider>
      <DevTool control={form.control} />
    </>
  );
}
