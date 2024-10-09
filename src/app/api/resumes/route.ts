import { NextResponse } from "next/server";
import { Resume } from "@/types";
import path from "path";
import fs from "fs";

export async function GET() {
    
  // defind location of folder
  const resumesDir = path.join(process.cwd(), "data", "resumes");

  try {
    const resumeFiles = fs.readdirSync(resumesDir);

    const resumes: Resume[] = resumeFiles.map((file) => {
      const id = path.parse(file).name ;
      const filePath = path.join(resumesDir, file);
      const stats = fs.statSync(filePath);
      return { id, name: `Resume ${id}`, filename: file, size: stats.size };
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Error reading resume files:", error);
    return NextResponse.json(
      { error: "Failed to read resume files" },
      { status: 500 }
    );
  }
}
