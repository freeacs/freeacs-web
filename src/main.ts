import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store/store';
import axios from 'axios';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import 'buefy/dist/buefy.css';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VeeValidate, { inject: false });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
