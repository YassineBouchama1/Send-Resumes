import { NextResponse } from 'next/server'
import { Letter } from '@/types'
import fs from 'fs'
import path from 'path'

export async function GET() {
    console.log(path.join(process.cwd()))
    const lettersDir = path.join(process.cwd(), 'data', 'letters')
    const letterFiles = fs.readdirSync(lettersDir)

    const letters: Letter[] = letterFiles.map(file => {
        const id = path.parse(file).name
        const content = fs.readFileSync(path.join(lettersDir, file), 'utf-8')
        return { id, name: `Letter ${id}`, content }
    })


    console.log(letters)

    return NextResponse.json(letters)
}