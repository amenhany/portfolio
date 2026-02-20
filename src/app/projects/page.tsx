import Nav from '@/components/Nav';
import DialogueBox from './_components/DialogueBox';

export default function Projects() {
   return (
      <main className="bg-nintendo-yellow min-h-screen vignette">
         <Nav />
         <DialogueBox prompt="welcome" />
      </main>
   );
}
