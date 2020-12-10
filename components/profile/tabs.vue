<template>
  <ul class="tabs" v-bind="$props">
    <li class="tabs-nav__item" :class="{'tabs-nav__item_active': ['profile-personal', 'profile'].includes(route)}">
      <router-link to="/profile">Profile</router-link>
    </li>
    <li class="tabs-nav__item" :class="{'tabs-nav__item_active': route === 'profile-statistics'}" v-if="userType == 2">
      <router-link to="/profile/statistics">Statistics</router-link>
    </li>
    <li class="tabs-nav__item" :class="{'tabs-nav__item_active': route === 'profile-talkens'}">
      <router-link to="/profile/talkens">Talkens </router-link>
    </li>
    <li class="tabs-nav__item" :class="{'tabs-nav__item_active': route === 'profile-settings'}">
      <router-link to="/profile/settings">Settings</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props:{
    userType: {
      type: Number,
      required:false
    }
  },
  computed: {
    route(): string {
      return this.$route.name!;
    }
  }
})
</script>

