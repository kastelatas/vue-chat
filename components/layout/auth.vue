<template>
  <div>
    <div class="auth" @click="toggle" v-click-outside="hide">
      <template v-if="user.identity">
        <div v-if="user.identity.profile.avatar" class="ava ava_online " @click="hide">
          <router-link to="/profile">
            <img class="ava__img" :src="$options.filters.media(user.identity.profile.avatar.path, 52)" alt="img">
          </router-link>
        </div>
        <div v-else class="ava ava_online ava_sm ava_no-img" @click="hide">
          <router-link to="/profile">
            <span>{{ user.identity.profile.name.substr(0, 1) }}</span>
          </router-link>
        </div>
        <div class="auth__wrapper">
          <span class="auth__name">{{ user.identity.profile.name }}</span>
          <span class="auth__status" v-if="user.identity.type !== 2">Status:
            <span class="auth__status-marked">
            {{ user.identity.profile.rankTitle }}</span>
          </span>
        </div>
        <div class="auth__icon">
          <button type="button" class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="11.312" height="7.125" viewBox="0 0 11.312 7.125"
              fill="#b2bcc5">
              <path d="M383.875,34.548l-5.7,5.609,1.4,1.426,5.7-5.609Zm-8.485-.072-1.426,1.4,5.608,5.7,1.427-1.4Z"
                transform="translate(-373.969 -34.469)"></path>
            </svg>
          </button>
        </div>
      </template>
      <template v-else>
        <div class="auth__icon">
          <button type="button" class="btn-icon">
            <svg fill="#b2bcc5" enable-background="new 0 0 32 32" height="32px" viewBox="0 0 32 32" width="32px"
              xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1,10h30c0.552,0,1-0.448,1-1c0-0.552-0.448-1-1-1H1C0.448,8,0,8.448,0,9C0,9.552,0.448,10,1,10z"></path>
              <path
                d="M31,15H1c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1h30c0.552,0,1-0.448,1-1C32,15.448,31.552,15,31,15z"></path>
              <path d="M31,22H11c-0.552,0-1,0.448-1,1s0.448,1,1,1h20c0.552,0,1-0.448,1-1S31.552,22,31,22z"></path>
            </svg>
          </button>
        </div>
      </template>

      <ul class="dropdown-menu" :class="{'dropdown-menu_show': opened}">
        <li v-if="user.identity && user.identity.status === 0" class="dropdown-menu__item">
          <span class="dropdown-menu__link" @click="$glob.modals.login.show = true">Login/Registration</span>
        </li>
        <li v-if="user.identity" class="dropdown-menu__item">
          <router-link class="dropdown-menu__link" to="/profile">Profile</router-link>
        </li>
        <li v-else class="dropdown-menu__item">
          <span class="dropdown-menu__link" @click="$glob.modals.login.show = true">Login/Sign Up</span>
        </li>
        <li class="dropdown-menu__item">
          <router-link class="dropdown-menu__link" to="/terms">Terms &amp; Conditions</router-link>
        </li>
        <li class="dropdown-menu__item">
          <router-link class="dropdown-menu__link" to="/about">About Us</router-link>
        </li>
        <li class="dropdown-menu__item">
          <router-link class="dropdown-menu__link" to="/privacy">Privacy Policy</router-link>
        </li>
        <li class="dropdown-menu__item">
          <router-link class="dropdown-menu__link" to="/faq">Faq</router-link>
        </li>
        <li class="dropdown-menu__item">
          <router-link class="dropdown-menu__link" to="/help">Help Center</router-link>
        </li>
        <li class="dropdown-menu__item">
          <router-link class="dropdown-menu__link" to="/news">News</router-link>
        </li>
        <span v-if="user.identity && user.identity.status !== 0">
          <li v-if="user.identity" class="dropdown-menu__item">
          <span class="dropdown-menu__link" @click="logout">Log out</span>
        </li>
        </span>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import * as core from '~/types/core'

interface IData {
  opened: boolean
}

export default Vue.extend({
  props: {
    logout: {
      required: true,
      type: Function
    }
  },

  data(): IData {
    return {
      opened: false,
    }
  },
  computed: {
    user(): core.IAuth {
      return this.$store.state.user;
    },

  },
  methods: {
    showVerification(): any{
      console.log( this.$glob.modals.verification.show)
      return this.$glob.modals.verification.show = true
    },
    toggle({target}: { target: HTMLElement }) {
      if (!target.closest('.ava')) {
        this.opened = !this.opened;
      }
    },
    hide() {
      this.opened = false;
    }
  },
  async fetch() {
    if (!String(this.$route.name).startsWith('user-')) {
      await this.$store.dispatch('user/init');
    }
  },
  fetchOnServer: true
})
</script>

<style>
.auth .dropdown-menu {
  margin-top: 18px;
}
</style>
