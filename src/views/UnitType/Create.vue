<template>
    <div class="unit-type-create">
        <h1>Create Unit Type</h1>
        <form @submit.prevent="submitForm()">
            <div>
                <label for="protocol">Protocol</label>
                <select id="protocol" v-model="protocol">
                    <option>TR069</option>
                </select>
            </div>
            <div>
                <label for="name">Name</label>
                <input id="name" v-model="name" />
                <div class="error" v-if="!$v.name.required">Field is required</div>
                <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
            </div>
            <div>
                <label for="description">Description</label>
                <textarea id="description" v-model="description">
                </textarea>
            </div>
            <div>
                <label for="vendor">Vendor</label>
                <input id="vendor" v-model="vendor" />
            </div>
            <div>
                <button>Submit</button>
            </div>
            <div class="error" v-if="submitStatus">Form is invalid</div>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { required, minLength } from 'vuelidate/lib/validators';

    @Component({
        validations: {
            name: {
                required,
                minLength: minLength(4),
            },
            protocol: {
                required,
                minLength: minLength(4),
            },
        },
    })
    export default class CreateUnitType extends Vue {

        name = '';
        protocol = 'TR069';
        description = '';
        vendor = '';
        submitStatus = '';

        submitForm() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                // do your submit logic here
                this.submitStatus = 'PENDING';
                setTimeout(() => {
                    this.submitStatus = 'OK';
                }, 500);
            }
        }
    }
</script>

<style>

</style>
