import mailPreview from './mail-preview.js'
import mailPeek from './mail-peek.js'

export default {
	components: { mailPreview, mailPeek },
	props: { mails: Array, selectedMail: String },
	template: `
        <section class="mail-list">
            <article v-for="mail in mails" class="mail-item" :key="mail.id">
                <mail-preview :mail="mail" @click.native="onSelectMail(mail.id)" class="mail-preview" />
                <mail-peek v-if="isSelected(mail.id)" :mail="mail" class="mail-peek" @delete-mail="onDeleteMail" @forward-mail="onForwardMail" @unread-mail="onUnreadMail"/>
            </article>
        </section>
    `,
	methods: {
		onSelectMail(mailId) {
			this.$emit('select-mail', mailId)
		},
		isSelected(mailId) {
			return this.selectedMail === mailId
		},
		onDeleteMail(mailId) {
			this.$emit('delete-mail', mailId)
		},
		onForwardMail(mailId) {
			this.$emit('forward-mail', mailId)
		},
		onUnreadMail(mailId) {
			this.$emit('unread-mail', mailId)
		},
	},
}
