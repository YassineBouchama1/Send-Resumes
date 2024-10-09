"use client";

import {  Resume } from "@/types";
import Loader from "@/components/Loader";
import { useMemo, type FC } from "react";
import SenderFormHook from "./SenderForm.hook";

interface SenderFormProps {
  resumes: Resume[];

}

const SenderForm: FC<SenderFormProps> = ({ resumes = []}) => {
  const {
    handleSubmit,
    isLoading,
    setMessage,
    setSelectedResume,
    setSubject,
    setEmails,
    message,
    selectedResume,
    subject,
    emails,
  } = SenderFormHook();


  const resumeOptions = useMemo(() => {
    return resumes.map((resume) => (
      <option key={resume.id} value={resume.id}>
        {resume.name}
      </option>
    ));
  }, [resumes]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden relative">
      {isLoading && <Loader />}

      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Email Sender</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="emails"
              className="block text-sm font-medium text-gray-700 pb-4"
            >
              <p>
                Email Addresses (comma-separated)
              </p>
              <span> Example: hello@yassine.info,bouchamajob@gmail.com</span>
            </label>

            <textarea
              id="emails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700"
            >
              Select Resume
            </label>
            <select
              id="resume"
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a resume</option>
              {resumeOptions}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Email Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 "
            >
              <p> Message : Html or Text</p>
            </label>

            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={6}
            />
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              style={{ opacity: isLoading ? 0.4 : 1 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Sending" : "Send Emails"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SenderForm;
