'use client';
import InvincibleSecret from '@/components/InvincibleSecret';
import { useSearchParams } from 'next/navigation';

export default function Secrets() {
   const searchParams = useSearchParams();
   const secret = searchParams.get('secret');

   if (secret !== 'invincible') return <></>;
   return <InvincibleSecret />;
}
