import Vue from 'vue';
import Vuex from 'vuex';
import { getStoreBuilder } from 'vuex-typex';
import { AuthenticationState, namespace as authenticationNamespace } from '@/store/AuthenticationModule';

Vue.use(Vuex);

export interface RootState {
  [authenticationNamespace]: AuthenticationState;
}

const store = getStoreBuilder<RootState>().vuexStore();
export default store;
