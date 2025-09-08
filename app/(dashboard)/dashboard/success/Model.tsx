"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useRef } from "react";

export default function EmailModal({ userEmail }: { userEmail: string }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(userEmail || "");
  const recuRef = useRef<HTMLDivElement>(null);

  const envoyerPDFParEmail = async () => {
    if (!email.trim())
      return alert("Veuillez entrer une adresse e-mail valide.");
    if (!recuRef.current) return alert("Reçu introuvable.");

    const recuElement = document.getElementById("recu");
    if (!recuElement) return;
    // 1. Capture HTML en image
    const canvas = await html2canvas(recuElement, {
      scale: 3, // réduit la qualité (et donc la taille)
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/jpeg"); // qualité JPEG 60%
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 20;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
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
    // Convert PDF to base64 string
    const pdfBase64 = pdf.output("datauristring");
    try {
      const res = await fetch("https://digitservz.dz/server/api/send-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pdfBase64 }),
      });

      if (!res.ok) throw new Error("Erreur d'envoi du mail");

      alert("Reçu envoyé avec succès");
      setShowModal(false);
    } catch (err: any) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <>
      <button className="btn" onClick={() => setShowModal(true)}>
        ✉️ Envoyer par email
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-lg w-[300px] text-center">
            <h3 className="text-lg font-semibold mb-4">Envoyer le reçu</h3>
            <input
              type="email"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={envoyerPDFParEmail}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Envoyer
            </button>
            <br />
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-gray-600 underline"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Reçu visible mais caché (ref pour PDF) */}
      <div id="recu" ref={recuRef} className="hidden">
        {/* insère ici ton composant du reçu */}
      </div>
    </>
  );
}
