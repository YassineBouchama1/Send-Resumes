import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailRequest } from "@/types";
import fs from "fs";
import path from "path";
import { config } from "../../../../config";


export async function POST(req: Request) {
  const { email, message, resumeId, subject }: EmailRequest = await req.json();



  // fetch resume file
  const resumesDir = path.join(process.cwd(), "data", "resumes");
  const resumeFilename = fs
    .readdirSync(resumesDir)
    .find((file) => path.parse(file).name === resumeId);
  const resumePath = path.join(resumesDir, resumeFilename!);



  // configure nodemailer with your email service credentials : useing Gmail
  //TODO: i will make this dynamic
  const transporter = nodemailer.createTransport({
    host: config.hostSmtp,
    port: config.portSmtp,
    auth: {
      user: config.emailSmtp,
      pass: config.passSmtp,
    },
  });

  try {
// send email
    await transporter.sendMail({
      from: config.emailSmtp,
      to: email,
      subject: subject,
      html: message,
      attachments: [
        {
          filename: resumeFilename,
          path: resumePath,
        },
      ],
    });

    return NextResponse.json({ message: "Emails sent successfully" ,success: true });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { message: "Error sending emails", success: false },
      { status: 500 }
    );
  }
}
