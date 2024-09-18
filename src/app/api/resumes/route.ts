import { NextResponse } from 'next/server'
import { Resume } from '@/types'
import fs from 'fs'
import path from 'path'

export async function GetResums() {

    // get resumes from folder 
    const resumesDir = path.join(process.cwd(), 'data', 'resumes')
    const resumeFiles = fs.readdirSync(resumesDir)

    const resumes: Resume[] = resumeFiles.map(file => {
        const id = path.parse(file).name
        return { id, name: `Resume ${id}`, filename: file }
    })

    return NextResponse.json(resumes)
}