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
                <li>Inbox</li>
                <li>Starred</li>
                <li>Sent Mail</li>
                <li>Drafts</li>
                <progress-bar :progress="progress"/>
            </ul>
        </aside>
    `,
	data() {
		return {
			progress: 0,
		}
	},
}
