"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaiementStore } from "@/stores/usePaiementStore";
import Image from "next/image";
import Logo from "@/components/imgs/logo-inter.png";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
export default function PayPage({ user }: { user: any }) {
  const router = useRouter();
  const data = usePaiementStore((s) => s.data);
  const hasHydrated = usePaiementStore((s) => s.hasHydrated);

  const PaiementProceed = async () => {
    const res = await fetch("https://digitservz.dz/server/api/r?" + "2500000");
    const resopnse = await res.json();
    if (resopnse.data.formUrl) {
      window.open(resopnse.data.formUrl, "_blank");
      //window.location.replace("https://digitservz.dz");
    }
  };
  console.log("➡️ data:", data);
  console.log("➡️ hasHydrated:", hasHydrated);
  // ⛔️ Ne rien faire tant que Zustand n'est pas prêt
  //useEffect(() => {
  //  if (hasHydrated && !data) {
  //    router.push("/dashboard/factures"); // ou "/" si tu veux
  //  }
  //}, [hasHydrated, data]);

  // ✅ Blocage du rendu si pas prêt
  if (!hasHydrated) {
    return <div>Chargement des données...</div>;
  }

  if (!data) {
    return <div>Aucune donnée de paiement trouvée</div>;
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Paiement Facture</h1>
        <ul className="space-y-2">
          <li>
            <strong>Nom Client:</strong> {user?.name}
          </li>
          <li>
            <strong>Code Client :</strong>
            {user?.displayUsername}
          </li>
          <li>
            <strong>Documents envoyés :</strong>
            <ul>
              {data.urls.map((url: string, i: number) => (
                <li key={i}>
                  <a
                    href={url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {data.files[i]}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-10">
            <strong className="font-bold text-2xl">Montant a payer :</strong>
            <strong className="font-bold text-2xl">25000,00 DA</strong>
          </li>
        </ul>
        <div className="flex items-center gap-3 font-semibold mt-10">
          <Checkbox id="terms" required />
          <Link className="underline" href="*">
            J’accepte les conditions générales
          </Link>
        </div>
        <button
          type="submit"
          onClick={() => PaiementProceed()}
          className="rounded-sm m-10 hover:bg-blue-600 items-center bg-amber-300 text-white  px-6 py-4 text-center no-underline flex flex-row gap-2 text-base border"
        >
          <span className="font-bold text-xl">Valide</span>
          <Image src={Logo} className="" alt="button" height="40" width="70" />
        </button>
      </div>
    </>
  );
}
