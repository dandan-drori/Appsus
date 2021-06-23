export const keepService = {
	toggleDone,
	query,
	getNoteById,
	removeNote,
}

import { storageService } from '../../../../services/async-storage-service.js'
import { utilService } from '../../../../services/util-service.js'

const NOTES_KEY = 'notes'

var gNotes = [
	{
		id: utilService.makeId(),
		type: 'textNote',
		isPinned: true,
		info: {
			txt: 'Fullstack Me Baby!',
		},
	},
	{
		id: utilService.makeId(),
		type: 'textNote',
		isPinned: true,
		info: {
			txt: 'Fullstack Me Baby!',
		},
	},
	{
		id: utilService.makeId(),
		type: 'textNote',
		isPinned: true,
		info: {
			txt: 'Fullstack Me Baby!',
		},
	},
	{
		id: utilService.makeId(),
		type: 'imgNote',
		info: {
			url: 'https://mcdn.wallpapersafari.com/medium/87/17/2LhMvT.jpg',
			title: 'Me playing Mi',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	{
		id: utilService.makeId(),
		type: 'videoNote',
		info: {
			url: 'https://www.youtube.com/embed/xojET5h50Ec',
			title: 'Diamond hearts',
		},
	},
	{
		id: utilService.makeId(),
		type: 'listNote',
		info: {
			label: 'How was it:',
			todos: [
				{ txt: 'Do that', doneAt: null },
				{ txt: 'Do this', doneAt: 187111111 },
			],
		},
	},
]

function query() {
	return storageService.query(NOTES_KEY).then(notes => {
		if (!notes || !notes.length) {
			utilService.saveToStorage(NOTES_KEY, gNotes)
			return Promise.resolve(gNotes)
		} else return notes
	})
}

function getNoteById(noteId) {
	return storageService.get(NOTES_KEY, noteId)
}

function toggleDone(note, idx) {
	return note.info.todos[idx].doneAt === null
		? (note.info.todos[idx].doneAt = Date.now())
		: (note.info.todos[idx].doneAt = null)
}

function removeNote(noteId) {
	return storageService.remove(NOTES_KEY, noteId)
}
