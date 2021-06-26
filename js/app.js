import { router } from './router.js'
import userMsg from './cmps/user-msg.js'
import appHeader from './cmps/app-header.js'
import appHeaderMobile from './cmps/app-header-mobile.js'
import appFooter from './cmps/app-footer.js'

const options = {
	el: '#app',
	router,
	components: {
		appHeader,
		appFooter,
		userMsg,
		appHeaderMobile,
	},
	template: `
        <main>
			<user-msg />
			<app-header-mobile v-if="isMobile"/>
            <app-header v-else/>
            <router-view :key="$route.fullPath"/> <!-- force re-render even when underlying component doesn't change -->
            <app-footer />
        </main>
    `,
	computed: {
		isMobile() {
			return screen.width < 768
		},
	},
}

new Vue(options)
