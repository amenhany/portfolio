import type { Metadata } from 'next';
import '../styles/globals.css';
import TransitionProvider from './_components/TransitionProvider';
import WiiCursor from '@/components/WiiCursor';
import { defaultFont, titleFont } from './fonts';

export const metadata: Metadata = {
   title: 'Amen Hany',
   description: "Amen Hany's Portfolio",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={`${defaultFont.variable} ${titleFont.variable}`}>
         <body className={`antialiased`}>
            <TransitionProvider>{children}</TransitionProvider>
            <WiiCursor />
         </body>
      </html>
   );
}
