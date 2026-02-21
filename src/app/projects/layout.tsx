import Nav from '@/components/Nav';
import { PropsWithChildren } from 'react';
import StarBackground from './_components/StarBackground';

export default function Layout({ children }: PropsWithChildren) {
   return (
      <>
         <Nav />
         <main className="bg-nintendo-yellow min-h-screen">
            <StarBackground />
            {children}
         </main>
      </>
   );
}
