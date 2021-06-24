import { storageService } from '../../../../js/services/async-storage-service.js'
import { utilService } from '../../../../js/services/util-service.js'

const MAILS_KEY = 'mails'
export const mailService = {
	getMails,
	getMailById,
	deleteMail,
	addMail,
	unreadMail,
	readMail,
}

var gMails = _createMails()

function getMails() {
	return storageService.query(MAILS_KEY).then(mails => {
		if (!mails || !mails.length) {
			utilService.saveToStorage(MAILS_KEY, gMails)
			return Promise.resolve(gMails)
		}
		return mails
	})
}

function addMail(mailData) {
	const { to, cc, bcc, subject, body } = mailData
	if (cc.indexOf(',') !== -1) {
		cc = cc.split(',')
	}
	if (bcc.indexOf(',') !== -1) {
		bcc = bcc.split(',')
	}
	const mail = _createMail(cc, bcc, subject, body)
	return storageService.post(MAILS_KEY, mail)
}

function deleteMail(mailId) {
	return storageService.remove(MAILS_KEY, mailId)
}

function getMailById(mailId) {
	return storageService.get(MAILS_KEY, mailId)
}

function unreadMail(mailId) {
	return getMailById(mailId).then(mail => {
		mail.isRead = false
		return storageService.put(MAILS_KEY, mail)
	})
}

function readMail(mailId) {
	return getMailById(mailId).then(mail => {
		mail.isRead = true
		return storageService.put(MAILS_KEY, mail)
	})
}

function _createMails() {
	return [
		_createMail(['Dandan'], ['Dandan'], 'Wassap?', 'Pick up!'),
		_createMail(['Dandan'], ['Dandan'], 'Vue.js', 'Hello Vue'),
		_createMail(['Dandan'], ['Dandan'], 'Wat Wat!!!', 'What?'),
		_createMail(['Dandan'], ['Dandan'], 'Kidding?', "I'm joking don't worry!"),
	]
}

function _createMail(cc, bcc, subject, body) {
	const id = utilService.makeId()
	return {
		id,
		sender: {
			name: 'Dandan',
			id,
		},
		recipient: {
			name: 'Dandan',
			id,
		},
		cc,
		bcc,
		subject,
		body,
		isRead: false,
		sentAt: Date.now(),
	}
}
