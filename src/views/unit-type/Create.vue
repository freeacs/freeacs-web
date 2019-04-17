<template>
    <div class="container">
        <h1>Create Unit Type</h1>
        <form role="form" autocomplete="off" @submit.prevent="submitForm()">
            <div class="form-group">
                <label class="control-label" for="name">Name</label>
                <input class="form-control"
                       type="text"
                       autocomplete="off"
                       id="name"
                       name="name"
                       v-model="name">
                <div class="help-block warning" v-if="!$v.name.required && dirty">
                    Name is required
                </div>
                <span class="help-block warning" v-if="!$v.name.minLength && dirty">
                    Name must have at least {{$v.name.$params.minLength.min}} letters.
                </span>
            </div>
            <div class="form-group">
                <label class="control-label" for="description">Description</label>
                <textarea class="form-control" id="description" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label class="control-label" for="vendor">Vendor</label>
                <input class="form-control" type="text" autocomplete="off" id="vendor" v-model="vendor"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="error" v-if="submitStatus">{{ submitStatus }}</div>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Model, Vue} from 'vue-property-decorator';
    import { required, minLength } from 'vuelidate/lib/validators';

    @Component({
        validations: {
            name: {
                required,
                minLength: minLength(3),
            },
        },
    })
    export default class CreateUnitType extends Vue {
        name = '';
        protocol = 'TR069';
        description = '';
        vendor = '';
        submitStatus = '';
        dirty = false;

        submitForm() {
            this.dirty = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
            } else {
                this.submitStatus = 'PENDING';
                setTimeout(() => {
                    this.submitStatus = 'OK';
                    this.name = '';
                    this.description = '';
                    this.vendor = '';
                    this.dirty = false;
                }, 500);
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 400px;
    }
    .warning {
        color:orange;
    }
</style>
