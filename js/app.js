import { router } from './router.js'
import userMsg from './cmps/user-msg.js'
import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'

const options = {
	el: '#app',
	router,
	components: {
		appHeader,
		appFooter,
		userMsg,
	},
	template: `
        <main>
			<user-msg />
            <app-header />
            <router-view :key="$route.fullPath"/> <!-- force re-render even when underlying component doesn't change -->
            <app-footer />
        </main>
    `,
}

new Vue(options)
