<template>
    <b-container>
        <h1>Create Unit Type</h1>
        <b-form role="form" autocomplete="off" @submit.prevent="submitForm()">
            <b-form-group label="Name *" label-for="name">
                <b-input
                        v-model.trim="name"
                        autocomplete="off"
                        :state="$v.name.$dirty ? !$v.name.$error : null"
                        id="name"
                ></b-input>
                <b-form-invalid-feedback v-if="$v.name.$error">
                    Please enter a name of at least 3 characters
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Description" label-for="description">
                <b-textarea
                        v-model.trim="description"
                        :state="$v.description.$dirty ? !$v.description.$error : null"
                        id="description"
                ></b-textarea>
                <b-form-invalid-feedback v-if="$v.description.$error">
                    Please enter a description with no more than 125 characters
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Vendor" label-for="vendor">
                <b-input
                        v-model.trim="vendor"
                        autocomplete="off"
                        :state="$v.vendor.$dirty ? !$v.vendor.$error : null"
                        id="vendor"
                ></b-input>
                <b-form-invalid-feedback v-if="$v.vendor.$error">
                    Please enter a vendor with no more than 25 characters
                </b-form-invalid-feedback>
            </b-form-group>
            <button type="submit" class="btn btn-primary">Submit</button>
            <b-alert v-if="!!submitStatus" v-model="submitStatus"
                     :variant="submitStatus === 'SUCCESS' ? 'success' : 'primary'" dismissible>
                {{ submitStatus }}
            </b-alert>
        </b-form>
    </b-container>
</template>

<script lang="ts">
    import {Component, Model, Vue} from 'vue-property-decorator';
    import {required, minLength, maxLength} from 'vuelidate/lib/validators';
    import axios from 'axios';

    @Component({
        validations: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(25),
            },
            description: {
                maxLength: maxLength(125),
            },
            vendor: {
                maxLength: maxLength(25),
            },
        },
    })
    export default class CreateUnitType extends Vue {
        name: string = '';
        protocol: string = 'TR069';
        description: string = '';
        vendor: string = '';
        submitStatus: string | null = null;

        submitForm() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
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
                        this.submitStatus = 'OK';
                        this.name = '';
                        this.description = '';
                        this.vendor = '';
                        this.$v.$reset();
                        this.submitStatus = 'SUCCESS';
                    },
                );
            }
        }
    }
</script>
