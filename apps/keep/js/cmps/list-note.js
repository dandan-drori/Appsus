import { keepService } from '../services/keep-service.js'

export default {
	props: ['note'],
	template: `
	
        <div class="list-note">
		<button @click="edit(note.id)">Edit</button>
            <h2>{{note.info.label}}</h2>
            <ul class="todo-list">
                <li v-for="(todo,idx) in note.info.todos" :key="todo.id" :class="isDone(idx)" @click="toggleDone(todo, idx)">
                    {{todo.txt}}
</li>
            </ul>
            <button @click="remove(note.id)">X</button>
        </div>
    `,
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
