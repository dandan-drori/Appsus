import { eventBus } from '../services/event-bus-service.js';

export default {
  template: `
        <section class="app-filter">
            <input type="search" :placeholder="placeholder" v-model="filterBy.subject" @input="onSetFilter" />
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
    };
  },
  methods: {
    onSetFilter() {
      if (this.app !== 'books' && this.app !== 'keep') {
        eventBus.$emit('set-filter-mail', this.filterBy);
      } else if (this.app === 'keep') {
        eventBus.$emit('set-filter-keep', this.filterBy.subject);
      }
    },
    onSetSort() {
      if (this.app !== 'books' && this.app !== 'keep') {
        eventBus.$emit('set-sort-mail', this.sortBy);
      }
    },
    onSetRead() {
      if (this.app !== 'books' && this.app !== 'keep') {
        eventBus.$emit('set-read-mail', this.read);
      }
    },
  },
  computed: {
    placeholder() {
      switch (this.app) {
        case 'mail':
          return 'Search mail';
        case 'keep':
          return 'Search notes';
        case 'book':
          return 'Search books';
        case 'mail/sent':
          return 'Search sent mails';
        case 'mail/star':
          return 'Search starred';
        case 'draft':
          return 'Search drafts';
      }
    },
  },
  created() {
    this.app = this.$route.path.substring(1);
  },
};
