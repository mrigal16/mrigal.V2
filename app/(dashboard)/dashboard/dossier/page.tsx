"use client"; // if App Router
import { usePaiementStore } from "@/stores/usePaiementStore";
import { useState } from "react";

export default function UploadDocuments({ code }: { code: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // ✅ merge new + old
      setFiles((prev) => [...prev, ...selectedFiles]);
      setPreview((prev) => [
        ...prev,
        ...selectedFiles.map((f) => URL.createObjectURL(f)),
      ]);
    }
  };
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };
  const setData = usePaiementStore((s) => s.setData);

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select at least one file");

    const formData = new FormData();
    files.forEach((file) => formData.append("documents", file));
    formData.append("userId", code);
    setLoading(true);
    try {
      const res = await fetch("https://digitservz.dz/api/dossier.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        alert("Documents uploaded successfully ✅");
        // redirect to payment page
        setData({
          userId: code,
          files: data.files,
          urls: data.urls,
        });
        window.location.href = "payment";
      } else {
        alert("Upload failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {console.log(code)}
      <div className="max-w-lg mx-auto p-6 border rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Téléversez les documents requis de dossier {code}
        </h2>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <div className="flex gap-2 flex-wrap mb-4">
          {preview.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                alt={`preview-${i}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-0 right-0  bg-red-600 text-red-300 rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload & Continue"}
        </button>
      </div>
    </>
  );
}
