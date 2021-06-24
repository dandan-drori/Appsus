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
            <mail-sidebar @open-compose="openCompose" :unread-mails="unreadMails"/>
            <mail-list v-if="mails && !isComposing" :mails="mails" :selected-mail="selectedMail" @delete-mail="onDeleteMail" @select-mail="onSelectMail" @forward-mail="onForwardMail" @unread-mail="onUnreadMail"/>
			<mail-compose v-if="isComposing" :mail="mailToForward" @close-compose="closeCompose" @send-mail="onSendMail"/>
        </section>
    `,
	data() {
		return {
			mails: null,
			selectedMail: null,
			isComposing: false,
			mailToForward: null,
			unreadMails: 0,
		}
	},
	methods: {
		loadMails() {
			mailService.getMails().then(mails => {
				this.mails = mails
				this.unreadMails = 0
				mails.forEach(mail => {
					if (mail.isRead) {
						this.unreadMails += 1
					}
				})
			})
		},
		onSelectMail(mailId) {
			mailService.readMail(mailId).then(mail => {
				this.selectedMail = this.selectedMail === mailId ? null : mailId
				if (!mail.isRead) {
					this.unreadMails--
				}
			})
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
		onUnreadMail(mailId) {
			mailService.unreadMail(mailId).then(() => {
				// this.recentUnread = mailId
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
