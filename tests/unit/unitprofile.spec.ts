import { expect } from 'chai';
import {createLocalVue, mount} from '@vue/test-utils';
import Buefy from 'buefy';
import * as VeeValidate from 'vee-validate';
import UnitProfileCreate from '@/views/unit/profile/UnitProfileCreate.vue';
import UnitProfileForm from '@/components/unit/profile/UnitProfileForm.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(VeeValidate);
localVue.use(Buefy);
const v = new VeeValidate.Validator();

describe('UnitProfileCreate', () => {
    it('render nested UnitProfileForm', () => {
        const wrapper = mount(UnitProfileCreate, { localVue, provide: () => ({ $validator: v }) });
        expect(wrapper.contains(UnitProfileForm)).to.equal(true);
        expect(wrapper.text()).to.contain('Create Profile');
    });

    it('show errors on empty fields', async () => {
        const wrapper = mount(UnitProfileCreate, { localVue, provide: () => ({ $validator: v }) });
        const form = wrapper.find('form');
        form.trigger('submit.prevent');
        await flushPromises();
        expect(wrapper.contains(UnitProfileForm)).to.equal(true);
        expect(v.errors.any()).to.eq(true);
        expect(v.errors.first('name')).to.eq('The Profile name field is required.');
        expect(v.errors.first('unitType')).to.eq('The Unit type field is required.');
    });
});
