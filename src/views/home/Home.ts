import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    message: string = '';

    created() {
        axios({
            url: '/rest/unittype',
            method: 'GET',
        }).then(() => {
            this.message = 'Successfully made an authorized request to backend!';
        }).catch(() => {
            this.message = 'Something went wrong when making a request to backend';
        });
    }
}
