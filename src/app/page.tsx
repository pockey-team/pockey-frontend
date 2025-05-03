import { userControllerGetUser } from "@/api/__generated__";
import { TestUser } from "@/components/TestUser";

export default async function Home() {
  const { data } = await userControllerGetUser("id:test").catch((error) => {
    console.error(error);
    return { data: { id: "error", name: "error" } };
  });

  return (
    <main className="h-screen bg-gradient-primary">
      <h1 className="mb-12px text-display">Pockey Frontend</h1>
      <p className="text-body-1">
        Test User from Server (id: {data.id}, name: {data.name})
      </p>
      <TestUser id="id:test" />
    </main>
  );
}
