<template>
    <div class="login-page">
        <div class="form">
            <center>Login in with admin/freeacs</center>
            <form class="login-form" v-on:submit.prevent>
                <input type="text" placeholder="username" v-model="username"/>
                <input type="password" placeholder="password" v-model="password"/>
                <button @click="submitLogin" :disabled=loginLoading>login</button>
            </form>
            <span v-if="loginFailed" style="color: red">Failed to log in</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import authentication from '../store/AuthenticationModule';

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
</script>

<style scoped>
    .login-page {
        width: 360px;
        padding: 8% 0 0;
        margin: auto;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form button {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #4CAF50;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #FFFFFF;
        font-size: 14px;
        cursor: pointer;
    }
    .form button:hover,.form button:active,.form button:focus {
        background: #43A047;
    }
    .form button:disabled {
        background: gray;
    }
    .form .message a {
        color: #4CAF50;
        text-decoration: none;
    }

</style>
