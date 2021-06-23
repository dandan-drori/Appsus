import { router } from './router.js'
import appHeader from '../cmps/app-header.js'
import appFooter from '../cmps/app-footer.js'

const options = {
	el: '#app',
	router,
	components: {
		appHeader,
		appFooter,
	},
	template: `
        <main>
            <app-header />
            <router-view />
            <app-footer />
        </main>
    `,
}

new Vue(options)
