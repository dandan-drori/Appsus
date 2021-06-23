import { keepService } from '../services/keep-service.js';
import textNote from '../cmps/text-note.js';
import imgNote from '../cmps/img-note.js';
import videoNote from '../cmps/video-note.js';
import listNote from '../cmps/list-note.js';

export default {
  template: `
    
        <section>
            <h2>this is keep app</h2>
            <section v-if="notes" v-for="note in notes" :key="note.id">
        <component :is="note.type"  :note="note"/>

        </section>
        </section>
        
        
    `,
  data() {
    return {
      notes: [],
    };
  },
  created() {
    this.notes = keepService.getNotes();
    console.log(this.notes);
  },
  components: {
    textNote,
    imgNote,
    videoNote,
    listNote,
  },
};
