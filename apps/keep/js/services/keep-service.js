export const keepService = {
	getNotes,
}

import { utilService } from '../../../../services/util-service.js'

var notes = [
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

function getNotes() {
	return notes
}
