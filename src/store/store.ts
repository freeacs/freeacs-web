import Vue from 'vue';
import Vuex from 'vuex';
import { getStoreBuilder } from 'vuex-typex';
import { AuthenticationState } from '@/store/AuthenticationModule';

Vue.use(Vuex);

export interface RootState {
  authentication: AuthenticationState;
}

const store = getStoreBuilder<RootState>().vuexStore();
export default store;
