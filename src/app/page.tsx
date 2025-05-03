import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUserControllerGetUser } from "@/api/__generated__";
import { TestUser } from "@/components/root/test-user";
import { getQueryClient } from "@/lib/tanstack-query";

export default async function Home() {
  const queryClient = await prefetchUserControllerGetUser(
    getQueryClient(),
    "id:test:server",
  );

  return (
    <main className="h-screen bg-gradient-primary">
      <h1 className="mb-12px text-display">Pockey Frontend</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TestUser id="id:test:server" />
      </HydrationBoundary>
      <TestUser id="id:test:client" />
    </main>
  );
}
