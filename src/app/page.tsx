import Link from 'next/link';
import BootClient from './_components/BootClient';

export default function Boot() {
   return (
      <>
         <Link href="/projects" className="invisible absolute inset-0 z-[-1]" />
         <BootClient />
      </>
   );
}
