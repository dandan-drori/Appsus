import { keepService } from '../services/keep-service.js'

export default {
	props: ['note'],
	template: `
	
        <div class="note list-note" :style="{backgroundColor:getColor}">
		<button @click="edit(note.id)">Edit</button>
            <h2>{{note.info.label}}</h2>
            <ul class="todo-list">
                <li v-for="(todo,idx) in note.info.todos" :key="todo.id" :class="isDone(idx)" @click="toggleDone(todo, idx)">
                    {{todo.txt}}
</li>
            </ul>
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
		isDone(idx) {
			console.log('this.note.info.todos[idx].doneAt', this.note.info.todos[idx].doneAt)
			return { done: this.note.info.todos[idx].doneAt }
		},
		toggleDone(todo, idx) {
			console.log('todo.doneAt', todo.doneAt)
			return keepService.toggleDone(this.note, idx)
		},
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
	// watch : {
	//     note(){
	//         deep:true,
	//         handler(newVal){
	//              this.note = newVal
	//         }
	//     }
	// }
}
