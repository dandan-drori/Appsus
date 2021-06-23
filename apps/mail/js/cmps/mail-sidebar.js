import progressBar from './progressBar.js'

export default {
	components: {
		progressBar,
	},
	props: {},
	template: `
        <aside class="mail-sidebar">
            <button>+ Compose</button>
            <ul class="mail-folders">
                <li v-for="link in links" @click="focusLink" :class="isFocused">{{link.text}}</li>
                <progress-bar :progress="progress"/>
            </ul>
        </aside>
    `,
	data() {
		return {
			progress: 0,
			links: [{ text: 'Inbox' }, { text: 'Sent Mail' }, { text: 'Starred' }, { text: 'Drafts' }],
		}
	},
	methods: {
		focusLink() {},
		isFocused() {
			return { focus: '' }
		},
	},
	computed: {},
}
