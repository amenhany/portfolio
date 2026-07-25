'use client';

import { AudioManager } from '@/lib/AudioManager';
import { AtSign, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useCallback, useState } from 'react';

type Icon = { label: string; href: string; icon: ReactNode };

const icons: Icon[] = [
   { label: 'Mail', href: 'mailto:amen.hany.2810@gmail.com', icon: <Mail size={27} /> },
   {
      label: 'GitHub',
      href: 'http://github.com/amenhany',
      icon: <Github size={27} />,
   },
   {
      label: 'LinkedIn',
      href: 'http://linkedin.com/in/amen-hany',
      icon: <Linkedin size={27} />,
   },
];

export default function Contacts() {
   const [open, setOpen] = useState(false);

   const handleOpen = useCallback(() => {
      setOpen((prev) => !prev);
      AudioManager.Instance().playSfx('/audio/next.wav');
   }, []);

   return (
      <div
         aria-label="Contact links"
         className="flex gap-3 drop-shadow items-center"
      >
         <motion.button
            aria-expanded={open}
            data-nav-tooltip="Contacts"
            className="nav-button"
            initial={{ x: -100 }}
            animate={{ x: 0, rotate: open ? 270 : 0 }}
            exit={{ x: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={handleOpen}
         >
            <AtSign size={30} />
         </motion.button>

         <AnimatePresence>
            {open &&
               icons.map((icon, i) => (
                  <motion.a
                     key={icon.label}
                     data-nav-tooltip={icon.label}
                     href={icon.href}
                     target="_blank"
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ delay: i * 0.05 }}
                     className="nav-button"
                  >
                     {icon.icon}
                  </motion.a>
               ))}
         </AnimatePresence>
      </div>
   );
}
