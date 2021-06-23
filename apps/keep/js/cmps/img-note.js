export default {
	props: ['note'],
	template: `
    <div class="img-note">
        <h2>{{note.info.title}}</h2>
       <img :src="note.info.url">
        </div>
    `,
}
