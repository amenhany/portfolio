'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { MouseEventHandler, ReactNode } from 'react';

export default function QueryLink({
   queryKey,
   children,
}: {
   queryKey: string;
   children: ReactNode;
}) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const handleClick: MouseEventHandler<HTMLSpanElement> = (evt) => {
      evt.stopPropagation();
      const params = new URLSearchParams(searchParams.toString());
      params.set('secret', queryKey);
      router.push(`${pathname}?${params.toString()}`);
   };

   return (
      <span onClick={handleClick} className="text-blue-500">
         {children}
      </span>
   );
}
