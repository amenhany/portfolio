import type { Metadata } from 'next';
import '../styles/globals.css';
import { Nunito } from 'next/font/google';
import TransitionProvider from './_components/TransitionProvider';
import WiiCursor from '@/components/WiiCursor';

export const metadata: Metadata = {
   title: 'Amen Hany',
   description: "Amen Hany's Portfolio",
};

const nunito = Nunito({
   subsets: ['latin'],
   weight: ['200', '300', '400', '500'],
   display: 'swap',
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={nunito.className}>
         <body className={`antialiased`}>
            <TransitionProvider>{children}</TransitionProvider>
            <WiiCursor />
         </body>
      </html>
   );
}
