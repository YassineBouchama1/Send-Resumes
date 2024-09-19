"use client";

import { useState } from "react";

import toast from "react-hot-toast";



const SenderFormHook = () => {
  const [emails, setEmails] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [selectedResume, setSelectedResume] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // function to handle
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // validation error
    if (!selectedLetter || !selectedResume || !subject || !emails.length) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    // Split emails
    const emailList = emails.split(",").map((email) => email.trim());

    // Send each email alone
    for (const email of emailList) {
      // Send email with a loading spinner and success/error toast
      await toast.promise(onSend(email), {
        loading: `Sending...To ${email}`,
        success: <b>Email sent!</b>,
        error: <b>Email not sent.</b>,
      });
    }

    // Stop loader
    setIsLoading(false);
  };

  //
  async function onSend(email: string): Promise<void> {
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          letterId: selectedLetter,
          resumeId: selectedResume,
          subject,
        }),
      });
    } catch (error) {
      throw error;
    }
  }

  return {
    handleSubmit,
    isLoading,
    setSelectedLetter,
    setSelectedResume,
    setSubject,
    setEmails,
    selectedLetter,
    selectedResume,
    subject,
    emails,
  };
};
export default SenderFormHook;
