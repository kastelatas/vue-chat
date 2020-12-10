<template>
  <div class="push-card animated  " :class="{
     fadeInRight: false,
  }" v-if="push.notification.kind != 1">
    <span class="push-card__timer" :class="{'push-card__timer-active' : push.timerOn}" :style="{'transition': 60 + 's'}"> </span>
    <div class="push-card__content">
      <div class="ava ava_online ava_photo">

        <router-link :to="'/id/' + push.notification.user().id">
          <img v-if="push.notification.user().avatar" class="ava__img" :src="push.notification.user().avatar | media(66)" :alt="push.notification.user().name">
          <span v-else class="ava__img ava_no-img">{{ push.notification.user().name.substr(0, 1) }}</span>
        </router-link>

        <div class="ava__append" :class="{
          'ava__append_color_yellow': push.notification.type  === 301,
          'ava__append_color_yellow': push.notification.type  === 302,
          'ava__append_color_purpure': push.notification.type  === 303,
          'ava__append_color_green': push.notification.type  === 304,
          'ava__append_color_green': push.notification.type  === 401,
          'ava__append_color_green': push.notification.type  === 404,
          'ava__append_color_none': push.notification.type  === 305
        }">

          <inline-svg src="/icons/photo.svg" v-if="push.notification.type  === 301"/>
          <inline-svg src="/icons/plus.svg" v-if="push.notification.type  === 302"/>
          <inline-svg src="/icons/kake.svg" v-if="push.notification.type  === 303"/>
          <inline-svg src="/icons/plus.svg" v-if="push.notification.type  === 304"/>
          <inline-svg src="/icons/eye.svg" v-if="push.notification.type  === 401"/>
          <inline-svg src="/icons/eye.svg" v-if="push.notification.type  === 404"/>

        </div>
      </div>
      <div class="push-card__wrap">
        <router-link :to="'/id/' +  push.notification.user().id" class="push-card__title">
          {{ push.notification.user().name }}
        </router-link>
        <span class="push-card__text">{{ push.message }}</span>
      </div>
    </div>
    <div class="push-card__row">
      <div class="push-card__text">{{ push.descr }}</div>
      <span v-if="push.notification.type === 305 || push.notification.type === 404">
       <router-link
         class="btn"
         :to="'/chat/' + push.notification.user().id"
       >
        Chat
       </router-link>
      </span>
    </div>
  </div>
</template>


<script lang="ts">
import Vue, {PropType} from "vue"
import * as chat from "~/types/chat"

export default Vue.extend({
  props: {
    push: {type: Object as PropType<chat.TPush>},
  },

  mounted() {
    setTimeout(() => {
      this.push.timerOn = true;
    }, 0);

  }
})
</script>
