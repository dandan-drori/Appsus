import { keepService } from '../services/keep-service.js';

export default {
  props: ['note'],
  template: `
	
        <div class="note list-note" :style="{backgroundColor:getColor}">
		
            <h2>{{note.info.label}}</h2>
            <ul class="todo-list">
                <li v-for="(todo,idx) in note.info.todos" :key="todo.id" :class="isDone(idx)" @click="toggleDone(todo, idx)">
                    {{todo.txt}}
</li>
            </ul>
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
    isDone(idx) {
      console.log(
        'this.note.info.todos[idx].doneAt',
        this.note.info.todos[idx].doneAt
      );
      return { done: this.note.info.todos[idx].doneAt };
    },
    toggleDone(todo, idx) {
      console.log('todo.doneAt', todo.doneAt);
      return keepService.toggleDone(this.note, idx);
    },
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    edit(noteId) {
      this.$emit('edit', noteId);
    },
    updateColor(noteId) {
      this.$emit('editColor', this.color, noteId);
    },
    pinNote(noteId) {
      this.$emit('setPin', noteId);
    },
  },
  computed: {
    getColor() {
      return this.note.style.backgroundColor;
    },
    title() {
      return this.note.isPinned ? 'Unpin' : 'pin';
    },
    getPinColor() {
      if (this.note.isPinned) {
        return { pinned: true };
      } else {
        return { pinned: false };
      }
    },
  },
  // watch : {
  //     note(){
  //         deep:true,
  //         handler(newVal){
  //              this.note = newVal
  //         }
  //     }
  // }
};
