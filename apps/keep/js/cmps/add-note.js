import { keepService } from '../services/keep-service.js'

export default {
	template: `<section class="add-note">
        <h2>Add note</h2>
        <select v-model="noteType">
        <option value="textNote">Text</option>
        <option value="videoNote">Video</option>
        <option value="imgNote">Image</option>
        <option value="listNote">List</option>
        </select>
        <input v-model="noteContent" placeholder="enter url/txt">
        <input v-model="noteTitle" placeholder="enter title">
        <button @click="addNote" class='add-note-btn'>Add</button>
        <pre>{{noteType}}</pre>
    </section>`,
	data() {
		return {
			noteToAdd: null,
			noteType: null,
			noteContent: null,
			noteTitle: null,
		}
	},
	methods: {
		addNote() {
			const newNote = keepService.getEmptyNote(this.noteType, this.noteContent, this.noteTitle)
			this.$emit('addNote', newNote)
		},
	},
}
