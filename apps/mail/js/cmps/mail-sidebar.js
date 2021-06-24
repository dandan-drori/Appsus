import progressBar from './mail-progress.js'

export default {
	components: {
		progressBar,
	},
	props: { readMails: Number, mails: Array },
	template: `
        <aside class="mail-sidebar">
            <button @click="onCompose">
				<i class="fas fa-plus"></i>Compose
			</button>
            <ul class="mail-folders">
                <li v-for="link in links">
					<router-link :to="link.to">
						<i :class="link.class"></i>
						{{link.text}}
					</router-link>
				</li>
            </ul>
			<progress-bar :read-mails="readMails" :mails="mails"/>
        </aside>
    `,
	data() {
		return {
			links: [
				{ to: '/mail', text: 'Inbox', class: 'fas fa-inbox' },
				{ to: '/mail/sent', text: 'Sent Mail', class: 'fas fa-paper-plane' },
				{ to: '/mail/star', text: 'Starred', class: 'far fa-star' },
				{ to: '/mail/draft', text: 'Drafts', class: 'fas fa-file' },
			],
		}
	},
	methods: {
		onCompose() {
			this.$emit('open-compose')
		},
	},
	computed: {},
}
