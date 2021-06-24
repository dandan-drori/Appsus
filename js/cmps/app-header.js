import appFilter from './app-filter.js'

export default {
	components: { appFilter },
	template: `
        <header class="main-header">
            <router-link to="/" class="main-logo">i am headerrrr</router-link>
            <app-filter />
            <nav class="main-nav">
                <router-link to="/">Home</router-link>
                <router-link to="/mail">Mail</router-link>
                <router-link to="/keep">Keep</router-link>
            </nav>
        </header>
    `,
}
