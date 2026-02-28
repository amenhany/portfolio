'use client';

import { useQueryParams } from '@/hooks/useQueryParams';
import { MouseEventHandler, ReactNode } from 'react';

export default function SecretLink({
   secret: secret,
   children,
}: {
   secret: string;
   children: ReactNode;
}) {
   const { setParam } = useQueryParams();

   const handleClick: MouseEventHandler<HTMLSpanElement> = (evt) => {
      evt.stopPropagation();
      setParam('secret', secret);
   };

   return (
      <span onClick={handleClick} className="text-blue-500">
         {children}
      </span>
   );
}
