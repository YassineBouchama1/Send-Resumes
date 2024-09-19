
import SenderForm from '@/components/SenderForm/SenderForm';
import { Letter, Resume } from "@/types";


import { Toaster } from 'react-hot-toast';

export default async function Home() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL_LOCAL;

  let lettersData: Letter[] = [];
  let resumesData : Resume[] = [];

  try {
    const resumesResponse = await fetch(`${apiUrl}/api/resumes`);
    const lettersResponse = await fetch(`${apiUrl}/api/letters`);

    if (!resumesResponse.ok || !lettersResponse.ok) {
      throw new Error("Network response was not ok");
    }

    lettersData = await lettersResponse.json();
    resumesData = await resumesResponse.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

   
   return (
     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
       <SenderForm letters={lettersData} resumes={resumesData} />
       <Toaster />
     </div>
   );
}
