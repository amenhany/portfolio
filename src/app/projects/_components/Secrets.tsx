'use client';
import InvincibleSecret from '@/components/InvincibleSecret';
import { AudioManager } from '@/lib/AudioManager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Secrets({ cleanUp }: { cleanUp: () => void }) {
   const searchParams = useSearchParams();
   const secret = searchParams.get('secret');

   const [loadSecret, setLoadSecret] = useState(false);

   useEffect(() => {
      setLoadSecret(false);
      if (secret === 'invincible')
         AudioManager.Instance()
            .load('/audio/invincible.wav')
            .then(() => setLoadSecret(true));
   }, [secret]);

   if (!loadSecret || secret !== 'invincible') return <></>;
   return <InvincibleSecret onDone={cleanUp} />;
}
