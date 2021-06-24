import homePage from './pages/home-page.js'
import mailPage from '../apps/mail/js/pages/mail-app.js'
import keepPage from '../apps/keep/js/pages/keep-app.js'

const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/mail',
		component: mailPage,
	},
	{
		path: '/mail/sent',
		component: mailPage,
	},
	{
		path: '/mail/star',
		component: mailPage,
	},
	{
		path: '/mail/draft',
		component: mailPage,
	},
	{
		path: '/keep',
		component: keepPage,
	},
]

export const router = new VueRouter({ routes })
