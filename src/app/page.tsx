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
    <main>
      <h1 className="font-bold text-4xl tracking-tight">Pockey Frontend</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TestUser id="id:test:server" />
      </HydrationBoundary>
      <TestUser id="id:test:client" />
    </main>
  );
}
