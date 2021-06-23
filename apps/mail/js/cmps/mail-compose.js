export default {
	props: { mail: Object },
	template: `
        <section class="mail-compose">
            <section class="mail-compose-header">
                <h3>New Message</h3>
            </section>
            <label>
                To:
                <input type="text"/>
            </label>
            <label>
                Cc:
                <input type="text"/>
            </label>
            <label>
                Bcc:
                <input type="text"/>
            </label>
            <label>
                Subject:
                <input type="text"/>
            </label>
            <textarea name="body"></textarea>
            <section class="actions">
                <button class="send">Send</button>
                <button @click="onCloseCompose">Close</button>
            </section>
        </section>
    `,
	data() {
		return {}
	},
	methods: {
		onCloseCompose() {
			this.$emit('close-compose')
		},
	},
	computed: {},
}
