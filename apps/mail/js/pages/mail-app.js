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
            <mail-list v-if="mails && !isComposing" :mails="mails" :selected-mail="selectedMail" @delete-mail="onDeleteMail" @select-mail="onSelectMail" @forward-mail="onForwardMail"/>
			<mail-compose v-if="isComposing" :mail="mailToForward" @close-compose="closeCompose" @send-mail="onSendMail"/>
        </section>
    `,
	data() {
		return {
			mails: null,
			selectedMail: null,
			isComposing: false,
			mailToForward: null,
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
		onForwardMail(mailId) {
			mailService.getMailById(mailId).then(mail => {
				this.mailToForward = mail
				this.isComposing = true
			})
		},
		onSendMail(mailData) {
			mailService.addMail(mailData).then(mail => {
				this.closeCompose()
				this.loadMails()
			})
		},
		openCompose() {
			this.isComposing = true
		},
		closeCompose() {
			this.mailToForward = null
			this.isComposing = false
		},
	},
	created() {
		this.loadMails()
	},
}
