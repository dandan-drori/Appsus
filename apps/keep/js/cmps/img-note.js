export default {
	props: ['note'],
	template: `
    <div class="note img-note" :style="{backgroundColor:getColor}">
	<input type="color" v-model="color" @change="updateColor(note.id)">
	<button @click="edit(note.id)">Edit</button>
        <h2>{{note.info.title}}</h2>
       <img :src="note.info.url">
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
	},
	computed: {
		getColor() {
			return this.note.style.backgroundColor
		},
	},
}
