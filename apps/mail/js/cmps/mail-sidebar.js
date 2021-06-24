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
                <li v-for="link in links" @click="focusLink" :class="isFocused">
					<i :class="link.class"></i>
					{{link.text}}
				</li>
            </ul>
			<progress-bar :read-mails="readMails" :mails="mails"/>
        </aside>
    `,
	data() {
		return {
			links: [
				{ text: 'Inbox', class: 'fas fa-inbox' },
				{ text: 'Sent Mail', class: 'fas fa-paper-plane' },
				{ text: 'Starred', class: 'far fa-star' },
				{ text: 'Drafts', class: 'fas fa-file' },
			],
		}
	},
	methods: {
		focusLink() {},
		isFocused() {
			return { focus: '' }
		},
		onCompose() {
			this.$emit('open-compose')
		},
	},
	computed: {},
}
