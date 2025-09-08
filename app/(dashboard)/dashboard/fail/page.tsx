import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function FailPage() {
  return (
    <div>
      <Card className="w-full " id="recu">
        <CardHeader className=" items-center  gap-2 ">
          <CardTitle className="flex flex-row items-center gap-2">
            <span className="font-bold text-3xl ">Reçu de paiement</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Statut :</div>
            <div className="value" id="statut"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FailPage;
