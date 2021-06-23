export default {
	props: { mail: Object },
	template: `
        <section class="mail-peek">
            <section class="mail-peek-header">
                <h2>{{mail.subject}}</h2>
                <section class="mail-peek-actions">
                    <button @click="onDelete(mail.id)">Del</button>
                    <button>MUr</button>
                    <button>Ful</button>
                </section>
            </section>
            <section class="mail-peek-sender-info">
                <h4>{{mail.sender.name}}</h4>
                <p>{{senderMail}}</p>
            </section>
            <section class="mail-peek-body">
                <p class="mail-peek-body-text">{{mail.body}}</p>
            </section>
        </section>
    `,
	methods: {
		onDelete(mailId) {
			this.$emit('delete-mail', mailId)
		},
	},
	computed: {
		senderMail() {
			return `<${this.mail.sender.name}@gmail.com>`
		},
	},
}
