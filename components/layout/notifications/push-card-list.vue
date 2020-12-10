<template>
  <div>

    <transition-group
      mode="in-out"
      appear
      after-enter-class="animated fadeOutUp "
      before-enter-class="animated fadeOutUp"
      enter-active-class="animated fadeInRight "
      leave-to-class="animated fadeOutUp"
      leave-active-class="animated fadeOutUp"
    >
      <PushCard v-for="(push) in pushes"
        :key="push.id"
        :push="push"
        class="list-item "
      />
    </transition-group>
  </div>
</template>



<script lang="ts">
import Vue, {PropType} from "vue"
import PushCard from "~/components/layout/notifications/push-card.vue";
import * as chat from "~/types/chat"
// import Velocity from 'velocity-animate'



export default Vue.extend({
  props: {
    pushes: {type: Array as PropType<chat.TPush[]>, required: true},
  },
  components: {
    PushCard
  },
  methods: {
    // beforeEnter: function (el) {
    //   el.style.opacity = 0
    //   el.style.height = 0
    // },
    // enter: function (el, done) {
    //   let delay = el.dataset.index * 150
    //   setTimeout(function () {
    //     Velocity(
    //       el,
    //       { opacity: 1, },
    //       { complete: done }
    //     )
    //   }, delay)
    // },
    // leave: function (el, done) {
    //   let delay = el.dataset.index * 150
    //   setTimeout(function () {
    //     Velocity(
    //       el,
    //       { opacity: 0, },
    //       { complete: done }
    //     )
    //   }, delay)
    // }
  }
})
</script>
