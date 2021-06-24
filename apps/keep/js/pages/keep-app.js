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
			<section  class="note-container">
            <section v-if="notes" v-for="note in notes" :key="note.id" class="notes-main">
			
        <component :is="note.type"  :note="note" @remove="removeNote"
		 @edit="onEditNote" 
		 @editColor="updateColor"/>
		</section>
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
				console.log(note)
			})
		},
		editNote(note) {
			keepService.updateNote(note).then(() => {
				this.loadNotes()
			})
			console.log(note)
		},
		updateColor(color, noteId) {
			keepService.getNoteById(noteId).then(note => {
				keepService.updateColor(note, color).then(() => {
					this.loadNotes()
				})
			})
		},
	},
	created() {
		// this.notes = keepService.getNotes()
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
