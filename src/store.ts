import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

interface State {
  status: string;
  token: string;
  user?: string;
}

const initialState = {
    status: '',
    token: localStorage.getItem('token') || '',
    user : undefined,
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    auth_request(state: State) {
      state.status = 'loading';
    },
    auth_success(state: State, payload: { token: string, username: string }) {
      state.status = 'success';
      state.token = payload.token;
      state.user = payload.username;
    },
    auth_error(state: State) {
      state.status = 'error';
    },
    logout(state: State) {
      state.status = '';
      state.token = '';
    },
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        setTimeout(() => {
          axios({url: '/rest/user/signin', data: user, method: 'POST'})
              .then((resp) => {
                const token = resp.data.token;
                const username = resp.data.username;
                localStorage.setItem('token', token);
                axios.defaults.headers.common.Authorization = token;
                commit('auth_success', {token, username});
                resolve(resp);
              })
              .catch((err) => {
                commit('auth_error');
                localStorage.removeItem('token');
                reject(err);
              });
        }, 2000);
      });
    },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
  },
  getters: {
    isError: (state) => state.status === 'error',
    isLoading: (state) => state.status === 'loading',
    isLoggedIn: (state) => !!state.token,
  },
});
