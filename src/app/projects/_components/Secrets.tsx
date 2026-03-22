'use client';
import InvincibleSecret from '@/components/InvincibleSecret';
import MarioSecret from '@/components/MarioSecret';
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
      else if (secret) setLoadSecret(true);
   }, [secret]);

   if (!loadSecret) return <></>;
   if (secret === 'invincible') return <InvincibleSecret onDone={cleanUp} />;
   else if (secret === '95') return <MarioSecret />;
   else return <></>;
}
