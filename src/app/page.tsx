'use client'

import { useState, useEffect } from 'react'
import { Letter, Resume } from '@/types'

export default function Home() {
  const [emails, setEmails] = useState<string>('')
  const [selectedLetter, setSelectedLetter] = useState<string>('')
  const [selectedResume, setSelectedResume] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [letters, setLetters] = useState<Letter[]>([])
  const [resumes, setResumes] = useState<Resume[]>([])



  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-center mb-8">Email Sender</h1>
          <form >
          <div className="mb-4">
              <label htmlFor="emails" className="block text-sm font-medium text-gray-700">Email Addresses (comma-separated)</label>
              <textarea
                id="emails"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="letter" className="block text-sm font-medium text-gray-700">Select Letter</label>
              <select
                id="letter"
                value={selectedLetter}
                onChange={(e) => setSelectedLetter(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a letter</option>
                {letters.map((letter) => (
                  <option key={letter.id} value={letter.id}>{letter.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Select Resume</label>
              <select
                id="resume"
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a resume</option>
                {resumes.map((resume) => (
                  <option key={resume.id} value={resume.id}>{resume.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Email Subject</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Emails
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}