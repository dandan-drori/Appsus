import mailList from '../cmps/mail-list.js'
import mailCompose from '../cmps/mail-compose.js'
import mailSidebar from '../cmps/mail-sidebar.js'
import { mailService } from '../services/mail-service.js'
import { eventBus } from '../../../../js/services/event-bus-service.js'

export default {
	components: {
		mailSidebar,
		mailList,
		mailCompose,
	},
	template: `
        <section class="mail-app main-app">
            <mail-sidebar v-if="mails" @open-compose="openCompose" :read-mails="readMails" :mails="mails"/>
            <mail-list v-if="mails && !isComposing" :mails="mailsToShow" :selected-mail="selectedMail" :recent-unread="recentUnread" @delete-mail="onDeleteMail" @select-mail="onSelectMail" @forward-mail="onForwardMail" @unread-mail="onUnreadMail" @read-mail="onReadMail"/>
			<mail-compose v-if="isComposing" :mail="mailToForward" @close-compose="closeCompose" @send-mail="onSendMail"/>
        </section>
    `,
	data() {
		return {
			mails: null,
			selectedMail: null,
			isComposing: false,
			mailToForward: null,
			recentUnread: null,
			readMails: 0,
			filterBy: null,
			sortBy: null,
			read: null,
		}
	},
	methods: {
		loadMails() {
			mailService.getMails().then(mails => {
				this.mails = mails
				this.readMails = 0
				mails.forEach(mail => {
					if (mail.isRead) this.readMails += 1
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
				eventBus.$emit('show-msg', { type: 'success', txt: 'wow!' })
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
				this.recentUnread = mailId
				this.selectedMail = null
				this.loadMails()
			})
		},
		onReadMail(mailId) {
			this.unreadMail = null
			mailService.readMail(mailId).then(() => {
				this.unreadMail = null
				this.loadMails()
				this.unreadMail = null
			})
			this.unreadMail = null
		},
		openCompose() {
			this.isComposing = true
		},
		closeCompose() {
			this.mailToForward = null
			this.isComposing = false
		},
	},
	computed: {
		mailsToShow() {
			let filteredMails = this.mails
			if (this.filterBy) {
				filteredMails = filteredMails.filter(mail => {
					return mail.subject.toLowerCase().includes(this.filterBy.subject.toLowerCase())
				})
			}
			if (this.read && this.read !== 'All') {
				filteredMails = filteredMails.filter(mail => {
					if (this.read === 'Read') return mail.isRead
					if (this.read === 'Unread') return !mail.isRead
				})
			}
			if (!this.sortBy) {
				return filteredMails
			}
			if (this.sortBy === 'Title') {
				return filteredMails.sort((a, b) => {
					const s1 = a.subject
					const s2 = b.subject
					return s1 > s2 ? 1 : s1 < s2 ? -1 : 0
				})
			}
			if (this.sortBy === 'Date') {
				return filteredMails.sort((a, b) => {
					const d1 = a.sentAt
					const d2 = b.sentAt
					return d1 > d2 ? 1 : d1 < d2 ? -1 : 0
				})
			}
		},
	},
	created() {
		this.loadMails()
		eventBus.$on('set-filter-mail', filterBy => {
			this.filterBy = filterBy
		})
		eventBus.$on('set-sort-mail', sortBy => {
			this.sortBy = sortBy
		})
		eventBus.$on('set-read-mail', read => {
			this.read = read
		})
	},
}
