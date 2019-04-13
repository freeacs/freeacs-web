import authentication from '../store/AuthenticationModule';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LoginComponent extends Vue {

    private username: string = '';
    private password: string = '';

    get loginLoading() {
        return authentication.isLoading;
    }

    get loginFailed() {
        return authentication.isError;
    }

    public submitLogin() {
        const username = this.username;
        const password = this.password;
        authentication.doLogin({ username, password })
            .then(
                () => this.$router.push('/'),
                () => null, // ignored
            );
    }
}
