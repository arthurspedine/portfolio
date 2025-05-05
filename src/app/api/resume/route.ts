import { NextResponse } from 'next/server'
import path from 'node:path'
import { promises as fs } from 'node:fs'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'resume.pdf')

  const fileBuffer = await fs.readFile(filePath)

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Arthur_Spedine-resume.pdf"',
    },
  })
}
