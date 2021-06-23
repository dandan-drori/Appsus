import { keepService } from '../services/keep-service.js'
import textNote from '../cmps/text-note.js'
import imgNote from '../cmps/img-note.js'
import videoNote from '../cmps/video-note.js'
import listNote from '../cmps/list-note.js'
import addNote from '../cmps/add-note.js'

export default {
	template: `
    
        <section>
            <h2>this is keep app</h2>
			<add-note @addNote="addNote"/>
            <section v-if="notes" v-for="note in notes" :key="note.id">
        <component :is="note.type"  :note="note" @remove="removeNote"/>

        </section>
        </section>
        
        
    `,
	data() {
		return {
			notes: [],
		}
	},
	methods: {
		loadNotes() {
			keepService.query().then(notes => (this.notes = notes))
		},
		removeNote(id) {
			keepService.removeNote(id).then(() => {
				this.loadNotes()
			})
		},
		addNote(newNote) {
			keepService.addNewNote(newNote).then(note => {
				this.notes.unshift(note)
			})
		},
	},
	created() {
		// this.notes = keepService.getNotes()
		console.log(this.notes)
		this.loadNotes()
	},
	components: {
		textNote,
		imgNote,
		videoNote,
		listNote,
		addNote,
	},
}
