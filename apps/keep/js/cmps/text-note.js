export default {
	props: ['note'],
	template: `
        <div class="note text-note" :style="{backgroundColor:getColor}">
          <div> 
            <h3>{{note.title}}</h3>
            <p>{{note.info.txt}}</p>
          </div>
        <div class="note-actions-container">
            <div class="container">
              <input type="color" v-model="color" @change="updateColor(note.id)" class="color-input">
			        <i class="fas fa-palette"></i>
		        </div>
		        <button @click="pinNote(note.id)">
              <i class="fas fa-thumbtack" :class="getPinColor"></i>
            </button>
		        <button @click="edit(note.id)">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="remove(note.id)">
              <i class="fas fa-trash"></i>
            </button>
		    </div>
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
			return this.note.style.backgroundColor
		},
		title() {
			return this.note.isPinned ? 'Unpin' : 'pin'
		},
		getPinColor() {
			if (this.note.isPinned) {
				return { pinned: true }
			} else {
				return { pinned: false }
			}
		},
	},
}
