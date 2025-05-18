import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const AuthSettingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    const params = new URLSearchParams({ callbackUrl: "/auth/settings" });
    return redirect(`/auth/sign-in?${params}`);
  }
};

export default AuthSettingsPage;
