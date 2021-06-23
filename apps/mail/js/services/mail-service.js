import { storageService } from '../../../../services/async-storage-service.js'
import { utilService } from '../../../../services/util-service.js'

const MAILS_KEY = 'mails'
export const mailService = {
	getMails,
	getMailById,
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

function getMailById(mailId) {
	return storageService.get(MAILS_KEY, mailId)
}

function _createMails() {
	return [
		_createMail('Wassap?', 'Pick up!'),
		_createMail('Vue.js', 'Hello Vue'),
		_createMail('Wat Wat!!!', 'What?'),
		_createMail('Kidding?', "I'm joking don't worry!"),
	]
}

function _createMail(subject, body) {
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
		subject,
		body,
		isRead: false,
		sentAt: Date.now(),
	}
}
