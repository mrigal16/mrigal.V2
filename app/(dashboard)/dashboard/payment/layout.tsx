import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/plugin";
import { Suspense } from "react";
import PayPage from "./page";

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
        <PayPage user={user} />
      </Suspense>
    </>
  );
}

//const user = await getUser();
//  if (!user) {
//    redirect("/sign-in");
//  }
//  return (
//    <Suspense fallback={<Loader2 />}>
//      <PayPage />
//    </Suspense>
//  );
