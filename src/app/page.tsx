import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserControllerGetUserQueryOptions } from "@/api/__generated__";
import { TestUser } from "@/components/root/test-user";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getUserControllerGetUserQueryOptions("id:test:server"),
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
