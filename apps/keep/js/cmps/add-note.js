import { keepService } from '../services/keep-service.js'

export default {
	props: ['note'],
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
        <button @click="addNote" class='add-note-btn'>{{title}}</button>
        <pre>{{noteType}}</pre>
    </section>`,
	data() {
		return {
			// noteToAdd: null,
			noteType: null,
			noteContent: null,
			noteTitle: null,
			isEdit: false,
		}
	},
	computed: {
		title() {
			return this.isEdit ? 'Edit' : 'Add'
		},
	},
	methods: {
		addNote() {
			if (!this.isEdit) {
				const newNote = keepService.getEmptyNote(this.noteType, this.noteTitle, this.noteContent)
				this.$emit('addNote', newNote)
			} else {
				const obj = {
					id: this.note.id,
					type: this.note.type,
					isPinned: false,
					info: {},
					style: {
						backgroundColor: this.note.style.backgroundColor,
					},
				}
				if (this.note.type === 'listNote') {
					obj.info.label = this.noteTitle
				} else {
					obj.info.title = this.noteTitle
				}
				if (this.note.type === 'textNote') {
					console.log(this.noteTitle)
					obj.title = this.noteTitle
					obj.info.txt = this.noteContent
				} else if (this.note.type === 'listNote') {
					obj.info.todos = keepService.getListTextObject(this.noteContent.split(','))
				} else {
					obj.info.url = this.noteContent
				}
				if (this.note.type === 'videoNote') {
					obj.info.url = this.noteContent.replace('watch?v=', 'embed/')
				}

				this.isEdit = false
				this.noteType = null
				this.noteContent = null
				this.noteTitle = null
				this.$emit('editNote', obj)
			}
		},
		edit(noteId) {
			this.$emit('edit', noteId)
		},
		arrayToString(arr) {
			let str = ''
			arr.forEach(obj => {
				str += obj.txt + ','
			})
			return str.substring(0, str.length - 1)
		},
	},
	created() {
		if (this.note) {
			this.isEdit = true
			this.noteType = this.note.type

			this.noteContent = this.note.type === 'textNote' ? this.note.info.txt : this.note.info.url
			this.noteTitle = this.note.type === 'listNote' ? this.note.info.label : this.note.info.title
			if (this.note.type === 'listNote') this.noteContent = this.arrayToString(this.note.info.todos)
			if (this.note.type === 'textNote') this.noteTitle = this.note.title
		}
	},
	watch: {
		note(newVal) {
			this.note = newVal
		},
	},
}
