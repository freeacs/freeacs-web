<template>
  <div id="app">
    <nav class="navbar is-white">
      <div class="navbar-brand">
        <a class="navbar-item brand-text">
          Freeacs
        </a>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">
            Home
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"><span><i class="mdi mdi-24px mdi-view-list"></i> Unit</span></a>
            <div class="navbar-dropdown is-hidden-touch">
              <router-link class="navbar-item" :to="{ name: 'unit-profile-create' }"><span><i class="mdi mdi-24px mdi-star"></i> Create Profile</span></router-link>
              <router-link class="navbar-item" :to={ name: 'unit-type-create' }"><span><i class="mdi mdi-24px mdi-star"></i> Create Unit Type</span></router-link>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" to="/about">
            About
          </router-link>
          <a class="navbar-item" v-if="isLoggedIn" @click="logout" href="#">
            Logout
          </a>
          <router-link class="navbar-item" v-else to="/login">
            Login
          </router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
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
  html, body {
    font-family: 'Open Sans', serif;
    font-size: 16px;
    line-height: 1.5;
    height: 100%;
    background: #ECF0F3;
  }
  nav.navbar {
    border-top: 4px solid #276cda;
    margin-bottom: 1rem;
  }
  .navbar-item.brand-text {
    font-weight: 300;
  }
  .navbar-item, .navbar-link {
    font-size: 14px;
    font-weight: 700;
  }

  .columns {
    width: 100%;
    height: 100%;
    margin-left: 0;
  }
  .menu-label {
    color: #8F99A3;
    letter-spacing: 1.3;
    font-weight: 700;
  }
  .menu-list a {
    color: #0F1D38;
    font-size: 14px;
    font-weight: 700;
  }
  .menu-list a:hover {
    background-color: transparent;
    color: #276cda;
  }
  .menu-list a.is-active {
    background-color: transparent;
    color: #276cda;
    font-weight: 700;
  }
</style>
