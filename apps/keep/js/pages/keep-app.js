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
			<add-note @addNote="addNote" :note="noteToEdit" :key="key" @editNote="editNote"/>
            <section v-if="notes" v-for="note in notes" :key="note.id">
        <component :is="note.type"  :note="note" @remove="removeNote" @edit="onEditNote"/>

        </section>
        </section>
        
        
    `,
	data() {
		return {
			notes: [],
			noteToEdit: null,
			key: '',
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
		onEditNote(noteId) {
			keepService.getNoteById(noteId).then(note => {
				this.noteToEdit = note
				this.key += 'a'
			})
		},
		editNote(note) {
			keepService.updateNote(note).then(() => {
				this.loadNotes()
			})
			console.log(note)
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
