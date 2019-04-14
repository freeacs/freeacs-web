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

<script src="./Login.ts"></script>

<style scoped src="./Login.css"></style>
