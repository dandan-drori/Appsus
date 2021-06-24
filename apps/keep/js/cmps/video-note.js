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
		   <div class="actions-container">
           <div class="container">

			   <input type="color" v-model="color" @change="updateColor(note.id)" class="color-input">
			   <i class="fas fa-palette"></i>
		   </div>
		   <button @click="pinNote(note.id)"><i class="fas fa-thumbtack" :class="getPinColor"></i></button>
		   <button @click="edit(note.id)"><i class="fas fa-edit"></i></button>
           <button @click="remove(note.id)"><i class="fas fa-trash"></i></button>
		   </div>
</div>
    `,
  data() {
    return {
      color: this.note.style.backgroundColor,
    };
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    updateColor(noteId) {
      this.$emit('editColor', this.color, noteId);
    },
    edit(noteId) {
      this.$emit('edit', noteId);
    },
    pinNote(noteId) {
      this.$emit('setPin', noteId);
    },
  },
  computed: {
    getColor() {
      console.log(this.note);
      return this.note.style.backgroundColor;
    },
    getPinColor() {
      if (this.note.isPinned) {
        return { pinned: true };
      } else {
        return { pinned: false };
      }
    },
    title() {
      return this.note.isPinned ? 'Unpin' : 'pin';
    },
  },
};
