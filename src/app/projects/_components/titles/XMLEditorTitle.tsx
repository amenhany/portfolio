import { tokenize } from '@/lib/tokenize';
import Typewriter from '../dialogue/Typewriter';

export default function XMLEditorTitle() {
   return (
      <Typewriter
         className="text-3xl text-shadow-md"
         tokens={tokenize([
            { text: '<' },
            { text: 'xml_editor', color: 'red-400' },
            { text: '/>' },
         ])}
         speed={10}
         sound={false}
      />
   );
}
