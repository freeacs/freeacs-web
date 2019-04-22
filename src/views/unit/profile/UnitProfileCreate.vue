<template>
    <section>
        <div class="title">Create Profile</div>
        <unit-profile-form></unit-profile-form>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UnitProfileForm from '@/components/unit/profile/UnitProfileForm.vue';

@Component({
    components: { UnitProfileForm },
    $_veeValidate: { validator: 'new' },
})
export default class UnitProfileCreate extends Vue {

}
</script>

<style scoped>

</style>