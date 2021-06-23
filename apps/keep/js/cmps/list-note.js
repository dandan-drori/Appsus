export default {
	props: ['note'],
	template: `
        <div class="list-note">
            <h2>{{note.info.label}}</h2>
            <ul class="todo-list">
                <li v-for="todo in note.info.todos" :key="todo.id">
                    {{todo.txt}}
                </li>
            </ul>
        </div>
    `,
}
