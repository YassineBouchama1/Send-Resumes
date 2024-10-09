
import SenderForm from '@/components/SenderForm/SenderForm';
import { Letter, Resume } from "@/types";


import { Toaster } from 'react-hot-toast';

export default async function Home() {


  // fetch all letters and resumes
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL_LOCAL;


  let resumesData : Resume[] = [];

  try {
    const resumesResponse = await fetch(`${apiUrl}/api/resumes`);

    if (!resumesResponse.ok ) {
      throw new Error("Network response was not ok");
    }

 
    resumesData = await resumesResponse.json();

  
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

   
   return (
     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
       <SenderForm  resumes={resumesData} />
       <Toaster />
     </div>
   );
}
