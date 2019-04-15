<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <a v-if="isLoggedIn" @click="logout" href="#">Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
                this.logout();
            }
            throw err;
        });
    }
}
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

</style>
