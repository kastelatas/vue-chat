import Vue from "vue"
import VueScroll from "vue-scroll"
import VueSelect from "vue-select"
import VueInfiniteLoading from "vue-infinite-loading"
import Modal from "~/components/ui/modal.vue"
import $conf from "./services/conf"
import $glob from "./services/glob"
import $ws from "./services/ws"

Vue.filter('date', (value) => {
  const date = new Date(value * 1000);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y;
});

Vue.filter('time', (value) => {
  const time = new Date(value * 1000);
  return time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
});

Vue.filter('media', (value, width: number = 0, height: number = 0) => {
  height = height || width;
  width = width * 2;
  height = height * 2;

  const ext = value.split('.').pop();
  if (ext && ['mp4', 'm4v', 'mov', 'avi', 'webm'].includes(ext)) {
    value += '#t=0.001';
  }

  return Vue.prototype.$conf.media + (width ? ('/' + width + 'x' + height) : '') + value;
});

Vue.component('modal', Modal);
Vue.component('vue-select', VueSelect);
Vue.component('infinite-loading', VueInfiniteLoading);
Vue.use(VueScroll);

export default function Core() {
  Vue.prototype.$ws = $ws;
  Vue.prototype.$conf = $ws.$conf = $conf;
  Vue.prototype.$glob = $ws.$glob = $glob;

  Vue.prototype.$wait = async function (check: { () }, timeout: number = 50) {
    await new Promise(resolve => {
      const wait = () => {
        if (!check()) {
          setTimeout(wait, timeout);
        } else {
          resolve();
        }
      }
      wait();
    });
  }
}

Vue.use(Core);
