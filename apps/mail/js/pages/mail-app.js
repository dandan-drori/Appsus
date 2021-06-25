import mailList from '../cmps/mail-list.js'
import mailCompose from '../cmps/mail-compose.js'
import mailSidebar from '../cmps/mail-sidebar.js'
import mailDetails from './mail-details.js'
import { mailService } from '../services/mail-service.js'
import { eventBus } from '../../../../js/services/event-bus-service.js'

export default {
	components: {
		mailSidebar,
		mailList,
		mailCompose,
		mailDetails,
	},
	template: `
        <section class="mail-app main-app">
            <mail-sidebar v-if="mails" @open-compose="openCompose" :read-mails="readMails" :mails="mails"/>
            <mail-list v-if="mails && !isComposing && !mail" :mails="mailsToShow" :selected-mail="selectedMail" :recent-unread="recentUnread" @delete-mail="onDeleteMail" @select-mail="onSelectMail" @forward-mail="onForwardMail" @unread-mail="onUnreadMail" @read-mail="onReadMail" @toggle-star="onToggleStar" @expand-mail="onExpandMail" @open-peek="openPeek"/>
			<mail-compose v-if="isComposing" :mail="mailToForward" @close-compose="closeCompose" @send-mail="onSendMail"/>
			<mail-details v-if="mail"  />
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
			mail: null,
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
		loadSentMails() {
			mailService.getMails().then(mails => {
				this.mails = mails.filter(mail => {
					return mail.isSent
				})
				this.readMails = 0
				mails.forEach(mail => {
					if (mail.isRead) this.readMails += 1
				})
			})
		},
		loadStarredMails() {
			mailService.getMails().then(mails => {
				this.mails = mails.filter(mail => {
					return mail.isStarred
				})
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
				const msg = {
					type: 'success',
					txt: 'mail deleted',
					link: '/mail',
				}
				eventBus.$emit('show-msg', msg)
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
				const msg = {
					type: 'success',
					txt: 'mail sent',
					link: '/mail',
				}
				eventBus.$emit('show-msg', msg)
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
		onToggleStar(mailId) {
			mailService.toggleStar(mailId).then(() => {
				this.loadMails()
				const msg = {
					type: 'success',
					txt: 'mail starred',
					link: '/mail',
				}
				eventBus.$emit('show-msg', msg)
			})
		},
		onExpandMail(mailId) {
			mailService.getMailById(mailId).then(mail => {
				this.mail = mail
				this.$router.push(`/mail/${mail.id}`).catch(() => {})
			})
		},
		onCloseMail() {
			this.mail = null
			this.$router.push('/mail').catch(() => {})
		},
		openCompose() {
			this.isComposing = true
		},
		closeCompose() {
			this.mailToForward = null
			this.isComposing = false
		},
		openPeek(mailId) {
			this.recentUnread = null
			setTimeout(() => {
				this.selectedMail = mailId
			}, 0)
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
		if (this.$route.path.includes('sent')) {
			this.loadSentMails()
		} else if (this.$route.path.includes('star')) {
			this.loadStarredMails()
		} else {
			this.loadMails()
		}
		eventBus.$on('set-filter-mail', filterBy => {
			this.filterBy = filterBy
		})
		eventBus.$on('set-sort-mail', sortBy => {
			this.sortBy = sortBy
		})
		eventBus.$on('set-read-mail', read => {
			this.read = read
		})
		eventBus.$on('close-details', this.onCloseMail)
	},
	watch: {
		'$route.params.mailId': {
			immediate: true,
			handler() {
				if (!Object.keys(this.$route.params).length) return
				const { mailId } = this.$route.params
				mailService.getMailById(mailId).then(mail => {
					this.mail = mail
					this.$router.push(`/mail/${mailId}`).catch(() => {})
				})
			},
		},
	},
}
