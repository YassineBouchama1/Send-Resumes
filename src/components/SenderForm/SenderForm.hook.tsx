"use client";

import { useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

const SenderFormHook = () => {
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Split emails
  const emailList = useMemo(() => {
    return emails.split(",").map((email) => email.trim());
  }, [emails]);

  // validation error
  const isFormValid = useMemo(() => {
    return message && selectedResume && subject && emails.length > 0;
  }, [message, selectedResume, subject, emails]);



  console.log(process.env.NEXT_PUBLIC_API_URL);
  // Send each email alone
  const onSend = useCallback(
    async (email: string): Promise<void> => {
            if (email.includes("bouchama"))
              throw new Error("Failed to send email");

      try {
     const response = await fetch("/api/send-email", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email,
         message,
         resumeId: selectedResume,
         subject,
       }),
     });

         if (!response.ok) {
           throw new Error("Failed to send email");
         }
      } catch (error) {
        throw error;
      }
    },
    [message, selectedResume, subject]
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

        try{

          await toast.promise(onSend(email), {
            loading: `Sending email to ${email}...`,
            success: () => `Email sent to ${email} successfully!`,
            error: (err) => `Failed to send email to ${email}. ${err}`,
          });
        } catch (error) {
          console.error(`Error sending email to ${email}:`, error);
         
        }
      }

      setIsLoading(false);
    },
    [isFormValid, emailList, onSend]
  );

  return {
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
  };
};

export default SenderFormHook;
