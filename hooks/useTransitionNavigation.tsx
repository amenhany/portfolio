'use client';
import { useRouter } from 'next/navigation';
import { useTransition } from '@/components/transitions/TransitionProvider';

export function useTransitionNavigation() {
   const router = useRouter();
   const { doTransition } = useTransition();

   const navigate = (href: string) => {
      doTransition(() => {
         router.push(href);
      });
   };

   return navigate;
}
