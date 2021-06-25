export default {
	template: `
        <section class="home-page main-app">
            <section class="mail">
                <section class="home-page-content">
                    <h2>Mails</h2>
                    <p>Use our mail client to communicate with your friends and colleagues!</p>
                    <router-link to="/mail">
                        Get Started
                        <i class="fas fa-arrow-right"></i>
                    </router-link>
                </section>
                <img src="../../imgs/google.png" alt="gmail" />
            </section>
            <section class="notes">
                <section class="home-page-content">
                    <h2>Notes</h2>
                    <p>Use our innovative post-it system to keep your work organized!</p>
                    <router-link to="/keep">
                        Get Started
                        <i class="fas fa-arrow-right"></i>
                    </router-link>
                </section>
                <img src="../../imgs/note.png" alt="note" />
            </section>
            <section class="books">
                <section class="home-page-content">
                    <h2>Books</h2>
                    <p>Browse our unique collection of limited edition books!</p>
                    <router-link to="/book">
                        Get Started
                        <i class="fas fa-arrow-right"></i>
                    </router-link>
                </section>
                <img src="../../imgs/book.png" alt="books" />
            </section>
        </section>
    `,
}
