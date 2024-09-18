import { Letter, Resume } from '@/types'
import SenderForm from '@/components/SenderForm';


import { Toaster } from 'react-hot-toast';

export default async function Home() {


const resumesResponse = await fetch(`${process.env.URL}/api/resumes`);
const lettersResponse = await fetch(`${process.env.URL}/api/letters`);

const lettersData: Letter[] = await lettersResponse.json();
const resumesData: Resume[] = await resumesResponse.json();



   
   return (
     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
       <SenderForm letters={lettersData} resumes={resumesData} />
       <Toaster />
     </div>
   );
}
