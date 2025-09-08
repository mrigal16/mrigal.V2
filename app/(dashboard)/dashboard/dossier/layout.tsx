import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/plugin";
import { Suspense } from "react";
import SuccessPage from "./page";
import UploadDocuments from "./page";

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
        <UploadDocuments code={user?.username} />
      </Suspense>
    </>
  );
}
