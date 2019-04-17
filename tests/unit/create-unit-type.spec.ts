import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import CreateUnitType from '@/views/unit-type/Create.vue';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('CreateUnitType', () => {

    it('renders without warnings', async () => {
        const wrapper = mount(CreateUnitType, { localVue });
        expect(wrapper.text()).to.not.contain('Name is required');
        expect(wrapper.text()).to.not.contain('Name must have at least');
    });

    it('displays warning about required name on submit', (done) => {
        const wrapper = mount(CreateUnitType, { localVue, sync: false });
        const form = wrapper.find('form');
        form.trigger('submit.prevent');
        Vue.nextTick(() => {
            expect(wrapper.text()).to.contain('Name is required');
            expect(wrapper.text()).to.contain('ERROR');
            done();
        });
    });

    it('displays warning about too few chars in name on submit', (done) => {
        const wrapper = mount(CreateUnitType, { localVue, sync: false });
        wrapper.setData({ name: 'ab'});
        const form = wrapper.find('form');
        form.trigger('submit.prevent');
        Vue.nextTick(() => {
            expect(wrapper.text()).to.contain('Name must have at least 3 letters.');
            expect(wrapper.text()).to.contain('ERROR');
            done();
        });
    });

    it('successfully calls api on submit when input is valid', async () => {
        const mock = new MockAdapter(axios);
        mock.onPost('/rest/unittype').reply(200);
        const wrapper = mount(CreateUnitType, { localVue, sync: false });
        wrapper.setData({ name: 'abc'});
        const form = wrapper.find('form');
        form.trigger('submit.prevent');
        await flushPromises();
        expect(wrapper.text()).to.not.contain('Name is required');
        expect(wrapper.text()).to.not.contain('Name must have at least 3 letters.');
        expect(wrapper.text()).to.not.contain('ERROR');
        expect(wrapper.text()).to.contain('SUCCESS');
    });
});
