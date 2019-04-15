<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"></HelloWorld>
    <span>{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    message: string = '';

    created() {
        axios({
            url: '/rest/unittype',
            method: 'GET',
        }).then(() => {
            this.message = 'Successfully made an authorized request to backend!';
        }).catch(() => {
            this.message = 'Something went wrong when making a request to backend';
        });
    }
}
</script>
