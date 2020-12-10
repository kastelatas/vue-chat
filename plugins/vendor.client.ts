import Vue from 'vue'
import Carousel from 'vue-carousel';
import ClickOutside from 'vue-click-outside'
import LightBox from 'vue-image-lightbox'
import LazyLoad from 'vue-lazyload'

Vue.use(LazyLoad);
Vue.use(Carousel);

Vue.component('light-box', LightBox);
Vue.directive('click-outside', ClickOutside);
