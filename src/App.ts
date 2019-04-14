import Vue from 'vue';
import Component from 'vue-class-component';
import authentication from './store/AuthenticationModule';
import axios from 'axios';

@Component
export default class AppComponent extends Vue {

    get isLoggedIn() {
        return authentication.isLoggedIn;
    }

    logout() {
        authentication.doLogout()
            .then(() => {
                this.$router.push('/login');
            });
    }

    created() {
        axios.interceptors.response.use(undefined, async (err) => {
            if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                authentication.doLogout()
                    .then(() => this.$router.push('/login'));
            }
            throw err;
        });
    }
}
