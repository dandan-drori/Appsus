import mailList from '../cmps/mail-list.js'
import mailCompose from '../cmps/mail-compose.js'
import mailSidebar from '../cmps/mail-sidebar.js'
import { mailService } from '../services/mail-service.js'

export default {
	components: {
		mailSidebar,
		mailList,
		mailCompose,
	},
	template: `
        <section class="mail-app main-app">
            <mail-sidebar @open-compose="openCompose"/>
            <mail-list v-if="mails && !isComposing" :mails="mails" :selected-mail="selectedMail" @delete-mail="onDeleteMail" @select-mail="onSelectMail" />
			<mail-compose v-if="isComposing" @close-compose="closeCompose" />
        </section>
    `,
	data() {
		return {
			mails: null,
			selectedMail: null,
			isComposing: false,
		}
	},
	methods: {
		loadMails() {
			mailService.getMails().then(mails => (this.mails = mails))
		},
		onSelectMail(mailId) {
			this.selectedMail = this.selectedMail === mailId ? null : mailId
		},
		onDeleteMail(mailId) {
			mailService.deleteMail(mailId).then(() => {
				this.loadMails()
			})
		},
		openCompose() {
			this.isComposing = true
		},
		closeCompose() {
			this.isComposing = false
		},
	},
	created() {
		this.loadMails()
	},
}
