import mailList from '../cmps/mail-list.js'
// import mailCompose from '../cmps/mail-compose.js'
import mailSidebar from '../cmps/mail-sidebar.js'
import { mailService } from '../services/mail-service.js'

export default {
	components: {
		mailSidebar,
		mailList,
		// mailPreview,
		// mailCompose,
	},
	template: `
        <section class="mail-app main-app">
            <mail-sidebar />
            <mail-list v-if="mails" :mails="mails" />
        </section>
    `,
	data() {
		return {
			mails: null,
		}
	},
	created() {
		mailService.getMails().then(mails => (this.mails = mails))
	},
}
