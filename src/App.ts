import Vue from 'vue';
import authentication from './store/AuthenticationModule';
import axios from 'axios';

export default Vue.extend({
    computed: {
        isLoggedIn() {
            return authentication.isLoggedIn;
        },
    },
    methods: {
        logout() {
            authentication.doLogout()
                .then(() => {
                    this.$router.push('/login');
                });
        },
    },
    created() {
        const router = this.$router;
        axios.interceptors.response.use(undefined, async (err) => {
            if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                authentication.doLogout().then(() => router.push('/login'));
            }
            throw err;
        });
    },
});
