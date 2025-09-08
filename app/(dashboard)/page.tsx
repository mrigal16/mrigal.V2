"use client";
import Landing from "@/components/Landing";
import { Footer, Header } from "./layout";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const { data: session } = authClient.useSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <main>
      <Landing />
      {/* <div className="mt-26 grid lg:grid-cols-3 gap-3 m-3 grid-cols-1">
        <Card
          className="flex aspect-[2/1] w-full max-w-md flex-col items-center justify-center rounded-xl  text-white
          p-8 text-center bg-black/60"
        >
          <CardTitle className="font-extrabold text-xl w-max p-2 ">
            🧾Obtenez votre reçu AADL sans tracas
          </CardTitle>
          <CardContent className="font-light">
            Plus besoin de galérer avec le paiement en ligne — on le fait à
            votre place et on vous envoie directement le récu.
          </CardContent>
        </Card>
        <Card
          className="flex w-full max-w-md flex-col items-center justify-center rounded-xl  text-white
          p-8 text-center bg-black/60"
        >
          <CardTitle className="font-extrabold text-xl w-max p-2 ">
            📊 Suivez l’avancement de votre paiement
          </CardTitle>
          <CardContent>
            Recevez des mises à jour en temps réel sur l’état de votre dossier
            depuis votre espace personnel <span>Mrigal</span>.
          </CardContent>
        </Card>
        <Card
          className="flex aspect-[2/1] w-full max-w-md flex-col items-center justify-center rounded-xl  text-white
         p-8 text-center bg-black/60"
        >
          <CardTitle className="font-extrabold text-xl w-max p-2 ">
            🔐 Inscription simple et sécurisée
          </CardTitle>
          <CardContent>
            Inscrivez-vous en quelques clics et laissez-nous gérer les
            démarches. Plus de déplacements, plus de stress.
          </CardContent>
        </Card>
      </div> */}
      <Footer />
    </main>
  );
}
