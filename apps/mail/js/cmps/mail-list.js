import mailPreview from './mail-preview.js'
import mailPeek from './mail-peek.js'

export default {
	components: { mailPreview, mailPeek },
	props: { mails: Array },
	template: `
        <section class="mail-list">
            <article v-for="mail in mails" class="mail-item">
                <mail-preview :mail="mail" key="mail.id" @click.native="onSelectMail(mail.id)" class="mail-preview" />
                <mail-peek v-if="isSelected(mail.id)" :mail="mail" class="mail-peek"/>
            </article>
        </section>
    `,
	data() {
		return {
			selectedMail: null,
		}
	},
	methods: {
		onSelectMail(mailId) {
			this.selectedMail = mailId
		},
		isSelected(mailId) {
			return this.selectedMail === mailId
		},
	},
}
