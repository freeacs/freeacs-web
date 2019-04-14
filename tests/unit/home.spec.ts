import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/home/Home.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HomeView', () => {
    it('renders nested HelloWorld component', () => {
        const mock = new MockAdapter(axios);
        mock.onGet('/rest/unittype').reply(200, []);
        const msg = 'Welcome to Your Vue.js + TypeScript App';
        const wrapper = mount(HomeView);
        expect(wrapper.contains(HelloWorld)).to.equal(true);
        expect(wrapper.text()).to.contain(msg);
    });
});
