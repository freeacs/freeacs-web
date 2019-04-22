<template>
    <section>
        <form @submit.prevent="submitForm">
            <b-field label="Unit type"
                     :type="{'is-danger': errors.has('unitType')}"
                     :message="errors.first('unitType')">
                <b-select placeholder="Unit type"
                          v-model="form.unitType"
                          name="unitType"
                          v-validate="'required'"
                          data-vv-as="Unit type"
                >
                    <option
                            v-for="option in unitTypes"
                            :value="option.id"
                            :key="option.id">
                        {{ option.label }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Profile name"
                     :type="{'is-danger': errors.has('name')}"
                     :message="errors.first('name')">
                <b-input v-model="form.name" name="name" data-vv-as="Profile name" v-validate="'required'"></b-input>
            </b-field>
            <b-button type="is-primary" native-type="submit" @click="submitForm" :loading="saving">Save</b-button>
        </form>
    </section>
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import {Validator} from 'vee-validate';
import BButton from 'buefy/src/components/button/Button.vue';
import axios from 'axios';


@Component({
    components: { BButton },
})
export default class UnitProfileForm extends Vue {
    @Inject('$validator') public $validator!: Validator;

    saving = false;
    form = {};
    unitType: number | null = null;
    unitTypes: object[] = [
        {
            id: 1,
            label: 'Unit type 1',
        },
        {
            id: 2,
            label: 'Unit type 2',
        },
        {
            id: 3,
            label: 'Unit type 3',
        },
    ];

    submitForm() {
        this.$validator.validateAll()
            .then((result) => {
                if (result) {
                    this.saving = true;

                    /**
                     * this emulates backend
                     * we can handle here other errors received by backed
                     */
                    setTimeout(() => {
                        this.saving = false;
                        this.$nextTick(() => {
                            this.$validator.reset();
                        });
                    }, 3000);
                }
            });

    }

}
</script>

<style scoped>

</style>