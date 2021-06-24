export default {
	props: { mail: Object, recentUnread: String },
	template: `
        <article :class="readClass" @click="markAsRead" :key="key" @mouseenter="onShowActions" @mouseleave="onHideActions">
            <p>{{mail.sender.name}}</p>
            <section class="content">
				<section class="text">
					<p>{{mail.subject}}</p> 
					<p class="body">- {{mail.body}}</p>
				</section>
				<p v-if="!showActions">{{formattedTime}}</p>
				<section class="mail-preview-actions" v-if="showActions">
					<button @click.stop="onDeleteMail(mail.id)" title="Delete">
						<i class="fas fa-trash"></i>
					</button>
					<button @click.stop="onForwardMail(mail.id)" title="Reply">
						<i class="fas fa-reply"></i>
					</button>
					<button @click.stop="onMarkUnread(mail.id)" title="Mark as Unread">
						<i class="fas fa-envelope-open"></i>
					</button>
					<button title="Expand">
						<i class="fas fa-expand"></i>
					</button>
					<button title="Star" @click.stop="onToggleStar(mail.id)">
						<i :class="[mail.isStarred ? 'fas fa-star' : 'far fa-star']"></i>
					</button>
				</section>
			</section>
        </article>
    `,
	data() {
		return {
			key: 0,
			isShowActions: false,
		}
	},
	methods: {
		markAsRead() {
			this.$emit('read-mail', this.mail.id)
			if (this.recentUnread !== this.mail.id) this.key++
		},
		onDeleteMail(mailId) {
			this.$emit('delete-mail', mailId)
		},
		onForwardMail(mailId) {
			this.$emit('forward-mail', mailId)
		},
		onMarkUnread(mailId) {
			this.$emit('unread-mail', mailId)
		},
		onToggleStar(mailId) {
			this.$emit('toggle-star', mailId)
		},
		onShowActions() {
			this.isShowActions = true
		},
		onHideActions() {
			this.isShowActions = false
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
		showActions() {
			return this.isShowActions
		},
	},
}
