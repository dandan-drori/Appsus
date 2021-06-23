export default {
	props: ['note'],
	template: `
    <div class="video-note">
        <h2>{{note.info.title}}</h2>
        <iframe
            :src="note.info.url"
            width="100%"
            height="100"
            frameborder="0" >
           </iframe>
           <button @click="remove(note.id)">X</button>
</div>
    `,
	methods: {
		remove(noteId) {
			this.$emit('remove', noteId)
		},
	},
}
