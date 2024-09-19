import { Letter, Resume } from '@/types'
import SenderForm from '@/components/SenderForm/SenderForm';


import { Toaster } from 'react-hot-toast';

export default async function Home() {
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "http://send-resumes-git-main-sisko0s-projects.vercel.app"
    : process.env.NEXT_PUBLIC_API_URL;

const resumesResponse = await fetch(`${apiUrl}/api/resumes`);
const lettersResponse = await fetch(`${apiUrl}/api/letters`);


 if (!resumesResponse.ok || !lettersResponse.ok) {
   throw new Error("Network response was not ok");
 }

const lettersData: Letter[] = await lettersResponse.json();
const resumesData: Resume[] = await resumesResponse.json();



   
   return (
     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
       <SenderForm letters={lettersData} resumes={resumesData} />
       <Toaster />
     </div>
   );
}
