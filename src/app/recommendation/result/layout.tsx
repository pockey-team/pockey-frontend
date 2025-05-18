import { Suspense } from "react";

const ResultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <main className="bg-gradient-recommendation">
        <section>{children}</section>
      </main>
    </Suspense>
  );
};

export default ResultLayout;
