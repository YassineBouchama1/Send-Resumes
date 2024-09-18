import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { EmailRequest, Letter, Resume } from '@/types'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
    const { emails, letterId, resumeId, subject }: EmailRequest = await req.json()

    // fetch letter content
    const lettersDir = path.join(process.cwd(), 'data', 'letters')
    const letterContent = fs.readFileSync(path.join(lettersDir, `${letterId}.html`), 'utf-8')

    // fetch resume file
    const resumesDir = path.join(process.cwd(), 'data', 'resumes')
    const resumeFilename = fs.readdirSync(resumesDir).find(file => path.parse(file).name === resumeId)
    const resumePath = path.join(resumesDir, resumeFilename!)

    // configure nodemailer with your email service credentials : useing Gmail
    //TODO: i will make this dynamic 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    try {
        // dend emails to each recipient
        for (const email of emails) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: letterContent,
                attachments: [
                    {
                        filename: resumeFilename,
                        path: resumePath,
                    },
                ],
            })
        }

        return NextResponse.json({ message: 'Emails sent successfully' })
    } catch (error) {
        console.error('Error sending emails:', error)
        return NextResponse.json({ message: 'Error sending emails' }, { status: 500 })
    }
}