import { NextResponse } from "next/server";
import { Letter } from "@/types";
import path from "path";
import fs from "fs";

export async function GET() {
  const lettersDir = path.join(process.cwd(), "data", "letters");

  try {
    const letterFiles = fs.readdirSync(lettersDir);

    const letters: Letter[] = letterFiles.map((file) => {
      const id = path.parse(file).name;
      const content = fs.readFileSync(path.join(lettersDir, file), "utf-8");
      return { id, name: `Letter ${id}`, content };
    });

    return NextResponse.json(letters);
  } catch (error) {
    console.error("Error reading letter files:", error);
    return NextResponse.json(
      { error: "Failed to read letter files" },
      { status: 500 }
    );
  }
}
