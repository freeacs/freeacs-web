import authentication from '../../store/AuthenticationModule';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Login extends Vue {

    username: string = '';
    password: string = '';

    get loginLoading() {
        return authentication.isLoading;
    }

    get loginFailed() {
        return authentication.isError;
    }

    submitLogin() {
        const username = this.username;
        const password = this.password;
        authentication.doLogin({ username, password })
            .then(
                () => this.$router.push('/'),
                () => null, // ignored
            );
    }
}
