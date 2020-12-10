<template>
  <div class="notification-dropdown" v-if="openNotification.show">
    <div class="notification-dropdown__header">
      <span>Notifications</span>
      <!--      <a href="" class="link">-->
      <!--        Mark all as read-->
      <!--      </a>-->
    </div>

    <ul class="notification-dropdown__content" v-if="notifications">
      <li class="notification-dropdown__item" v-for="notification in notifications" v-if="notification.kind === 1">
        <div class="ava ava_xs">
          <inline-svg src="/icons/check.svg"/>
        </div>
        <div class="notification-dropdown__item-content">
          <span class="notification-dropdown__item-text">
            <span class="notification-dropdown__item-title" v-if="notification.type === 101">Your email is successfully changed.</span>
            <span class="notification-dropdown__item-title"
              v-if="notification.type === 102">Your email is virified.</span>
            <span class="notification-dropdown__item-title" v-if="notification.type === 103">Your password is successfully changed.</span>
            <span class="notification-dropdown__item-title" v-if="notification.type === 104">Your password has been reset.</span>
            <span class="notification-dropdown__item-title" v-if="notification.type === 105">You have replenished your balance</span>
          </span>
          <div class="notification-dropdown__item-date"></div>
        </div>
      </li>

      <div class="empty-state" v-if="!notifications.length">No Notifications</div>

    </ul>
    <div class="notification-dropdown__footer">
      <!--      <span class="link" @click="all">-->
      <!--        View All-->
      <!--      </span>-->
    </div>
  </div>
</template>


<script lang="ts">
import Vue, {PropType} from 'vue'


export default Vue.extend({
  props: {
    openNotification: {
      type: Object as PropType<{ show: boolean }>,
    },
    notifications: {
      type: Array
    }
  },
  data() {
    return {
      notific: this.notifications.slice(0, 3)
    }
  },
  methods: {
    all() {
      this.notifications.slice(0, this.notifications.length)
    }
  },
})
</script>
