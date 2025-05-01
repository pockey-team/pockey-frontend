"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { BudgetDrawer } from "@/components/recommendation/setup/budget-drawer";

export default function RecommendationSetupBudgetPage() {
  return (
    <Suspense>
      <RecommendationSetupBudget />
    </Suspense>
  );
}

const RecommendationSetupBudget = () => {
  const router = useRouter();
  const { name } = Object.fromEntries(useSearchParams());

  const handleSubmit = (amounts: number[]) => {
    alert("TODO");
    router.push("/recommendation/questions");
  };

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <BudgetDrawer name={name} onSubmit={handleSubmit} onClose={handleClose} />
  );
};
