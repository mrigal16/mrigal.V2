import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

export async function POST(req) {
  try {
    // ✅ Parse multipart form data
    const formData = await req.formData();
    const files = formData.getAll("documents");
    const userId = formData.get("userId"); // 👈 Send this from frontend

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId" },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      u;
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 }
      );
    }

    // 📂 Create user directory if not exists
    const cpanelUser = "digitservz"; // 👈 replace with your cPanel username
    const uploadDir = `/home/${cpanelUser}/public_html/uploads/${userId}`;

    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // ✅ Save all files
    for (const file of files) {
      if (typeof file === "string") continue; // skip non-files

      const bytes = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, file.name);

      await writeFile(filePath, bytes);
      console.log(`✅ Saved ${filePath}`);
    }

    return NextResponse.json({ success: true, message: "Files uploaded" });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
