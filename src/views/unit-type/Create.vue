<template>
    <section>
        <div class="title">Create Unit Type</div>
        <form role="form" autocomplete="off" @submit.prevent="submitForm()">
            <b-field label="Name"
                     :type="{'is-danger': errors.has('name')}"
                     :message="errors.first('name')">
                <b-input v-model="name" name="name" data-vv-as="Name" v-validate="'required'"></b-input>
            </b-field>
            <b-field label="Description"
                     :type="{'is-danger': errors.has('description')}"
                     :message="errors.first('description')">
                <b-input v-model="description" name="description" data-vv-as="Description"></b-input>
            </b-field>
            <b-field label="Vendor"
                     :type="{'is-danger': errors.has('vendor')}"
                     :message="errors.first('vendor')">
                <b-input v-model="vendor" name="vendor" data-vv-as="Vendor"></b-input>
            </b-field>
            <b-button type="is-primary" native-type="submit" :loading="submitStatus === 'PENDING'">Save</b-button>
        </form>
    </section>
</template>

<script lang="ts">
    import {Component, Inject, Vue} from 'vue-property-decorator';
    import BButton from 'buefy/src/components/button/Button.vue';
    import BField from 'buefy/src/components/field/Field.vue';
    import BInput from 'buefy/src/components/input/Input.vue';
    import axios from 'axios';
    import {Validator} from 'vee-validate';

    @Component({
        $_veeValidate: { validator: 'new' },
        components: { BButton, BField, BInput },
    })
    export default class CreateUnitType extends Vue {
        @Inject('$validator') public $validator!: Validator;

        name: string | null = null;
        protocol: string = 'TR069';
        description: string = '';
        vendor: string = '';
        submitStatus: string | null = null;

        submitForm() {
            this.$validator.validateAll()
                .then((valid) => {
                    if (valid) {
                        this.submitStatus = 'PENDING';
                        axios({
                            url: '/rest/unittype',
                            method: 'POST',
                            data: {
                                name: this.name,
                                description: this.description,
                                vendor: this.vendor,
                                protocol: this.protocol,
                            },
                        }).then(
                            () => {
                                this.name = '';
                                this.description = '';
                                this.vendor = '';
                                this.submitStatus = '';
                                this.$validator.reset();
                            },
                        );
                    }
                });
        }
    }
</script>
