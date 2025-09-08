import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/plugin";
import { Suspense } from "react";
import FailPage from "./page";

export default async function PaiementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Suspense fallback={<Loader2 />}>
        <div className="flex items-center justify-center h-screen mt-4 bg-gray-100">
          <FailPage />
        </div>
      </Suspense>
    </>
  );
}
