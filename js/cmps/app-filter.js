import { eventBus } from '../services/event-bus-service.js'

export default {
	template: `
        <section>
            <input type="search" :placeholder="placeholder" v-model="filterBy.subject" @input="onSetFilter"/>
            <select name="sort" v-if="app === 'mail'" v-model="sortBy" @change="onSetSort">
                <option value="" disabled hidden>Sort</option>
                <option>Date</option>
                <option>Title</option>
            </select>
            <select name="sort" v-if="app === 'mail'" v-model="read" @change="onSetRead">
                <option selected>All</option>
                <option>Read</option>
                <option>Unread</option>
            </select>
        </section>
    `,
	data() {
		return {
			app: null,
			filterBy: {
				subject: '',
			},
			sortBy: 'Date',
			read: 'All',
		}
	},
	methods: {
		onSetFilter() {
			if (this.app === 'mail') {
				eventBus.$emit('set-filter-mail', this.filterBy)
			} else if (this.app === 'keep') {
				eventBus.$emit('set-filter-keep', this.filterBy)
			}
		},
		onSetSort() {
			if (this.app === 'mail') {
				eventBus.$emit('set-sort-mail', this.sortBy)
			}
		},
		onSetRead() {
			if (this.app === 'mail') {
				eventBus.$emit('set-read-mail', this.read)
			}
		},
	},
	computed: {
		placeholder() {
			return this.app === 'mail'
				? 'Search mail'
				: this.app === 'keep'
				? 'Search notes'
				: 'Search books'
		},
	},
	created() {
		this.app = this.$route.path.substring(1)
	},
}
