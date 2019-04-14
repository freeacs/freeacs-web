import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import Component from 'vue-class-component';
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
        }).then((res) => {
            if (Array.isArray(res.data)) {
                this.message = 'Successfully made an authorized request to backend!';
            } else {
                this.message = 'Something went wrong when making a request to backend';
            }
        });
    }
}
