import HomeContent from "@/components/HomeContent";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");

  return <HomeContent {...currentUser} />;
}
