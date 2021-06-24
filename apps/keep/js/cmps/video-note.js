export default {
	props: ['note'],
	template: `
    <div class="note video-note" :style="{backgroundColor:getColor}">
        <h2>{{note.info.title}}</h2>
        <iframe
            :src="note.info.url"
            width="100%"
            height="100"
            frameborder="0" >
           </iframe>
           <button @click="edit(note.id)">Edit</button>
           <input type="color" v-model="color" @change="updateColor(note.id)">
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
		updateColor(noteId) {
			this.$emit('editColor', this.color, noteId)
		},
		edit(noteId) {
			this.$emit('edit', noteId)
		},
	},
	computed: {
		getColor() {
			console.log(this.note)
			return this.note.style.backgroundColor
		},
	},
}
