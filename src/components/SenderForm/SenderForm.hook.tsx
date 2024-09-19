"use client";

import { useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

const SenderFormHook = () => {
  const [emails, setEmails] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Split emails
  const emailList = useMemo(() => {
    return emails.split(",").map((email) => email.trim());
  }, [emails]);

  // validation error
  const isFormValid = useMemo(() => {
    return selectedLetter && selectedResume && subject && emails.length > 0;
  }, [selectedLetter, selectedResume, subject, emails]);



  console.log(process.env.NEXT_PUBLIC_API_URL);
  // Send each email alone
  const onSend = useCallback(
    async (email: string): Promise<void> => {
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            letterId: selectedLetter,
            resumeId: selectedResume,
            subject,
          }),
        });
      } catch (error) {
        throw error;
      }
    },
    [selectedLetter, selectedResume, subject]
  );

  // Send email with a loading spinner and success/error toast
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      if (!isFormValid) {
        toast.error("All fields are required.");
        setIsLoading(false);
        return;
      }

      for (const email of emailList) {
        await toast.promise(onSend(email), {
          loading: `Sending...To ${email}`,
          success: <b>Email sent!</b>,
          error: <b>Email not sent.</b>,
        });
      }

      setIsLoading(false);
    },
    [isFormValid, emailList, onSend]
  );

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
