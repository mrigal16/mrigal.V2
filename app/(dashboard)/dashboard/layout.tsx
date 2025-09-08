import { redirect } from "next/navigation";
import { getUser } from "@/lib/plugin"; // or your server‐side auth helper
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    // We’ll mount our client UI shell here
    <DashboardShell>{children}</DashboardShell>
  );
}
