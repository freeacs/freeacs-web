import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import CreateUnitType from '@/views/unit-type/Create.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises';
import * as VeeValidate from 'vee-validate';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(Buefy);
const v = new VeeValidate.Validator();

describe('CreateUnitType', () => {

    afterEach(() => {
        v.reset();
    });

    it('renders without warnings', async () => {
        const wrapper = mount(CreateUnitType, { localVue, provide: () => ({ $validator: v }) });
        await flushPromises();
        expect(wrapper.text()).to.not.contain('The Name field is required.');
    });

    it('displays warning about required name on submit', async () => {
        const wrapper = mount(CreateUnitType, { localVue, provide: () => ({ $validator: v }) });
        const input = wrapper.find('input[type=text][name=name]');
        input.setValue('');
        input.trigger('input');
        const form = wrapper.find('form');
        form.trigger('submit.prevent');
        await flushPromises();
        expect(wrapper.vm.errors.any()).to.eq(true);
    });

    it('successfully calls api on submit when input is valid', async () => {
        const mock = new MockAdapter(axios);
        mock.onPost('/rest/unittype').reply(200);
        const wrapper = mount(CreateUnitType, { localVue, provide: () => ({ $validator: v }) });
        const input = wrapper.find('input[type=text][name=name]');
        input.setValue('abc');
        input.trigger('input');
        const form = wrapper.find('form');
        form.trigger('submit.prevent');
        await flushPromises();
        expect(wrapper.vm.errors.any()).to.eq(false);
    });
});
