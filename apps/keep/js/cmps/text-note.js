export default {
	props: ['note'],
	template: `
        <div class="text-note">
		<button @click="edit(note.id)">Edit</button>
            <h3>{{note.info.title}}</h3>
            <p>{{note.info.txt}}</p>
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
