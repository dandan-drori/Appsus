export default {
	props: ['note'],
	template: `
        <div class="note text-note" :style="{backgroundColor:getColor}">
			<h3>{{note.title}}</h3>
            <p>{{note.info.txt}}</p>
			<input type="color" v-model="color" @change="updateColor(note.id)">
			<button @click="pinNote(note.id)">{{title}}</button>
			<button @click="edit(note.id)">Edit</button>
            <button @click="remove(note.id)">X</button>
        </div>
    `,
	data() {
		return {
			color: this.note.style.backgroundColor,
		}
	},
	methods: {
		remove(noteId) {
			this.$emit('remove', noteId)
		},
		edit(noteId) {
			this.$emit('edit', noteId)
		},
		updateColor(noteId) {
			this.$emit('editColor', this.color, noteId)
		},
		pinNote(noteId) {
			this.$emit('setPin', noteId)
		},
	},
	computed: {
		getColor() {
			console.log(this.note)
			return this.note.style.backgroundColor
		},
		title() {
			return this.note.isPinned ? 'Unpin' : 'pin'
		},
	},
}
