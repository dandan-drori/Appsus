import mailPreview from './mail-preview.js'

export default {
	components: { mailPreview },
	props: { mails: Array },
	template: `
        <section class="mail-list">
            <mail-preview v-for="mail in mails" :mail="mail" :key="mail.id"/>
        </section>
    `,
}
