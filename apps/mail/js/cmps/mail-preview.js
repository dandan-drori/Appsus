export default {
	props: { mail: Object },
	template: `
        <article :class="readClass" @click="markAsRead">
            <p>{{mail.sender.name}}</p>
            <section class="content">
				<section class="text">
					<p>{{mail.subject}}</p> 
					<p class="body">- {{mail.body}}</p>
				</section>
				<p>{{formattedTime}}</p>
            </section>
        </article>
    `,
	methods: {
		markAsRead() {
			this.mail.isRead = true
		},
	},
	computed: {
		formattedTime() {
			const fullTime = new Date(this.mail.sentAt)
			const formattedFullTime = fullTime
				.toLocaleString()
				.substring(0, fullTime.toLocaleString().length - 3)
			const date = formattedFullTime.split(',')[0]
			const time = formattedFullTime.split(',')[1]
			// if mail was sent more than 24 hours ago, return date instead of time
			return Date.now() - this.mail.sentAt > 86400000 ? date : time
		},
		readClass() {
			return this.mail.isRead ? 'read' : ''
		},
	},
}
