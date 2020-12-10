import Vue from 'vue'
import InlineSvg from 'vue-inline-svg'
import TextareaAutosize from 'vue-textarea-autosize'
import { uuid as $uuid } from 'vue-uuid';

Vue.component('inline-svg', InlineSvg);
Vue.use(TextareaAutosize);

export default function Vendor() {
  Vue.prototype.$uuid = $uuid;
}

Vue.use(Vendor);
