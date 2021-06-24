import progressBar from './mail-progress.js'

export default {
	components: {
		progressBar,
	},
	props: { unreadMails: Number },
	template: `
        <aside class="mail-sidebar">
            <button @click="onCompose">+ Compose</button>
            <ul class="mail-folders">
                <li v-for="link in links" @click="focusLink" :class="isFocused">{{link.text}}</li>
            </ul>
			<progress-bar :unread-mails="unreadMails"/>
        </aside>
    `,
	data() {
		return {
			links: [{ text: 'Inbox' }, { text: 'Sent Mail' }, { text: 'Starred' }, { text: 'Drafts' }],
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
