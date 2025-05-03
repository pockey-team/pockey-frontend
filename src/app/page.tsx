import { userControllerGetUser } from "@/api/__generated__";
import { TestUser } from "@/components/TestUser";

export default async function Home() {
  const { data } = await userControllerGetUser("id:test").catch((error) => {
    console.error(error);
    return { data: { id: "error", name: "error" } };
  });

  return (
    <main className="h-screen bg-gradient-primary">
      <h1 className="font-bold text-4xl tracking-tight">Pockey Frontend</h1>
      <p className="font text-2xl tracking-tight">
        Test User from Server (id: {data.id}, name: {data.name})
      </p>
      <TestUser id="id:test" />
    </main>
  );
}
