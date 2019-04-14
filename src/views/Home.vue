<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <span>{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios';

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
    }).then((res) => {
      if (Array.isArray(res.data)) {
        this.message = 'Successfully made an authorized request to backend!';
      } else {
        this.message = 'Something went wrong when making a request to backend';
      }
    });
  }
}
</script>
