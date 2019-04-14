import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/home/Home.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HelloWorld from '@/components/HelloWorld.vue';
import flushPromises from 'flush-promises';

describe('HomeView', () => {
    it('renders nested HelloWorld component', async () => {
        // in this test:
        // the following two lines is just to avoid unhandled promise rejection
        const mock = new MockAdapter(axios);
        mock.onGet('/rest/unittype').reply(200, []);
        const wrapper = mount(HomeView);
        expect(wrapper.contains(HelloWorld)).to.equal(true);
        expect(wrapper.text()).to.contain('Welcome to Your Vue.js + TypeScript App');
    });

    it('renders success message for HTTP 200 axios response', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('/rest/unittype').reply(200, []);
        const wrapper = mount(HomeView);
        await flushPromises();
        expect(wrapper.text()).to.contain('Successfully made an authorized request to backend!');
    });

    it('renders failure message for HTTP 500 axios response', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('/rest/unittype').reply(500, null);
        const wrapper = mount(HomeView);
        await flushPromises();
        expect(wrapper.text()).to.contain('Something went wrong when making a request to backend');
    });
});
