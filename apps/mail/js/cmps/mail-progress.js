export default {
	props: { unreadMails: Number },
	template: `
        <progress max="100" :value="progress"><span></span></progress>
    `,
	computed: {
		progress() {
			console.log('this.unreadMails', this.unreadMails)
			return 100 / (this.unreadMails + 1)
		},
	},
}
