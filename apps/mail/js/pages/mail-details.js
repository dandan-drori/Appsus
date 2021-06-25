import { mailService } from '../services/mail-service.js'
import { eventBus } from '../../../../js/services/event-bus-service.js'

export default {
	template: `
        <section v-if="mail">
            <section class="mail-peek">
                <section class="mail-peek-header">
                    <h2>{{mail.subject}}</h2>
                    <button @click="closeDetails">X</button>
                </section>
                <section class="mail-peek-sender-info">
                    <h4>{{mail.sender.name}}</h4>
                    <p>{{senderMail}}</p>
                </section>
                <section class="mail-peek-body">
                    <p class="mail-peek-body-text">{{mail.body}}</p>
                </section>
				<router-link :to="'/mail/' + nextMailId">Next Mail</router-link>
				<router-link :to="'/mail/' + prevMailId">Prev Mail</router-link>
            </section>
        </section>
    `,
	data() {
		return {
			mail: null,
			nextMailId: null,
			prevMailId: null,
		}
	},
	methods: {
		setMail() {
			mailService.getMailById(this.$route.params.mailId).then(mail => {
				this.mail = mail
			})
		},
		closeDetails() {
			eventBus.$emit('close-details')
		},
	},
	created() {
		this.setMail()
	},
	computed: {
		senderMail() {
			return `<${this.mail.sender.name}@gmail.com>`
		},
	},
	watch: {
		'$route.params.mailId': {
			immediate: true,
			handler() {
				const { mailId } = this.$route.params
				mailService.getMailById(mailId).then(mail => (this.mail = mail))
				mailService.getNextMailId(mailId).then(mailId => (this.nextMailId = mailId))
				mailService.getPrevMailId(mailId).then(mailId => (this.prevMailId = mailId))
			},
		},
	},
}
