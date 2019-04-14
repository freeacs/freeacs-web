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

<script src="./App.ts"></script>

<style lang="less" src="./App.less"></style>
