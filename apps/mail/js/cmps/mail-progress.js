export default {
	props: { readMails: Number, mails: Array },
	template: `
        <progress max="100" :value="progress"><span></span></progress>
    `,
	computed: {
		progress() {
			return ((100 / this.mails.length) * this.readMails).toFixed(0)
		},
	},
}
