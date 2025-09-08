"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/imgs/di.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import EmailModal from "./Model";
const SuccessPage = ({ user }: { user: any }) => {
  async function imprimerPDF() {
    const recuElement = document.getElementById("recu");
    if (!recuElement) return;

    const canvas = await html2canvas(recuElement, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 20;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.setFontSize(11);
    pdf.setTextColor(60);
    const pageHeight = pdf.internal.pageSize.getHeight();
    const footerLines = [
      "Whatsapp : 0775 96 96 42",
      "E-mail : contact@digitservz.dz",
      "ANPT, Incubateur, Sidi-Abdellah, Rahmania, Alger",
    ];

    footerLines.reverse().forEach((line, i) => {
      pdf.text(line, 10, pageHeight - 10 - i * 7);
    });
    // Convertir PDF en blob pour impression
    const blob = pdf.output("blob");
    const blobURL = URL.createObjectURL(blob);

    const win = window.open(blobURL);
    if (win) {
      win.onload = function () {
        win.focus();
        win.print();
      };
    }
  }
  async function telechargerPDF() {
    const recuElement = document.getElementById("recu");
    if (!recuElement) return;

    // 1. Utiliser html2canvas pour capturer une image du reçu
    const canvas = await html2canvas(recuElement, {
      scale: 2, // meilleure qualité
      useCORS: true, // si des images externes
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // 2. Dimensions du PDF
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 3. Dimensions de l'image
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 20; // marges gauche/droite
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // 4. Ajouter l'image centrée dans le PDF
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.setFontSize(11);
    pdf.setTextColor(60);
    const footerLines = [
      "Whatsapp : 0775 96 96 42",
      "E-mail : contact@digitservz.dz",
      "ANPT, Incubateur, Sidi-Abdellah, Rahmania, Alger",
    ];
    footerLines.reverse().forEach((line, i) => {
      pdf.text(line, 10, pageHeight - 10 - i * 7);
    });
    pdf.save("recu-paiement.pdf");
  }

  return (
    <div>
      <Card className="w-full " id="recu">
        <CardHeader className=" items-center  gap-2 ">
          <CardTitle className="flex flex-row items-center gap-2">
            <Image src={Logo} height={40} width={100} alt="digitservz" />
            <span className="font-bold text-3xl ">Reçu de paiement</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Statut :</div>
            <div className="value" id="statut"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Numéro de commande :</div>
            <div className="value" id="orderNumber"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">orderId :</div>
            <div className="value" id="orderId"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Code d'autorisation :</div>
            <div className="value" id="approvalCode"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Montant :</div>
            <div className="value" id="montant">
              DA
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Mode de paiement :</div>
            <div className="value">Carte CIB/Edhahabia</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Date :</div>
            <div className="value" id="date"></div>
          </div>
          <div className="italic text-center " id="footerMessage">
            <span>
              En cas de problème de paiement, veuillez contacter le numéro vert
              SATIM
            </span>
            <img
              src="data:image/png;base64,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"
              alt="En cas de problème de paiement, veuillez contacter le numéro vert SATIM : 3020"
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Button className="" onClick={() => imprimerPDF()}>
          Imprimer
        </Button>
        <Button className="" onClick={() => telechargerPDF()}>
          télécharger PDF{" "}
        </Button>
        <EmailModal userEmail={user.email} />
      </div>
    </div>
  );
};

export default SuccessPage;
