export default {
	props: ['note'],
	template: `
    <div class="img-note">
	<button @click="edit(note.id)">Edit</button>
        <h2>{{note.info.title}}</h2>
       <img :src="note.info.url">
       <button @click="remove(note.id)">X</button>
        </div>
    `,
	methods: {
		remove(noteId) {
			this.$emit('remove', noteId)
		},
		edit(noteId) {
			this.$emit('edit', noteId)
		},
	},
}
