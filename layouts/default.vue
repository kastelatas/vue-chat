<template>
  <section class="main" :key="key">
    <TopicList v-if="!isAmbassador && (!$route.name || !$route.name.startsWith('chat'))"/>
    <ContactList v-else/>

    <section class="main__section chat-main">
      <header class="header">
        <div class="header-desktop">
          <router-link class="logo" to="/">
            <inline-svg src="/icons/logo.svg"/>
          </router-link>
          <nav class="nav">
            <ul class="nav__container" v-if="loaded">
              <li v-if="isAmbassador" class="nav__item">
                <router-link tag="a" exact active-class="nav__link_active" class="nav__link" to="/dashboard">
                  Dashboard
                </router-link>
              </li>
              <li v-else class="nav__item">
                <router-link tag="a" exact active-class="nav__link_active" class="nav__link" to="/">
                  Hug Search
                </router-link>
              </li>
              <li class="nav__item">
                <router-link class="nav__link" active-class="nav__link_active" to="/chat/">chat room</router-link>
              </li>
              <li class="nav__item">
                <router-link class="nav__link" active-class="nav__link_active" to="/help/">Help Center</router-link>
              </li>
            </ul>
          </nav>
          <div class="header-desktop__item">
            <div v-if="auth.identity" class="notification " :class="{
              'notification_active': false
            }">
              <NotificationDropdown :openNotification="openNotification" :notifications="notifications"/>
              <button type="button" class="btn-icon" @click="handlerOpenNotification">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="#b2bcc5">
                  <g>
                    <g id="bell">
                      <rect x="8" y="23" width="8" height="2" rx="1" ry="1"></rect>
                      <path
                        d="M24,21a4.94,4.94,0,0,0-1-3c-1-1-2-4-2-4V7s0-7-8-7H12V2h3s4,1,4,5v6a11.91,11.91,0,0,0,2,6H12v2Z"></path>
                      <path
                        d="M0,21a4.94,4.94,0,0,1,1-3c1-1,2-4,2-4V7s0-7,8-7h1V2H9S5,3,5,7v6a11.91,11.91,0,0,1-2,6h9v2Z"></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
            <Auth :logout="logout"/>
          </div>
        </div>
        <div class="header-mobile">
          <div class="header-mobile__row header-mobile__space-between">
            <button type="button" class="btn-icon" @click="activeMobMenu = true">
              <inline-svg src="/icons/burger.svg"/>
            </button>
            <div class="header-mobile__overlay active_mob" v-show="activeMobMenu">
              <i class="header-mobile__close" @click=" activeMobMenu = false"></i>
              <div class="header-mobile__menu">
                <div class=" header-mobile__column">

                  <div class="header-mobile__logo">
                    <a class="logo" href="/">
                      <inline-svg src="/icons/logo.svg"/>
                    </a>

                  </div>
                  <div class="header-mobile__auth">
                    <template v-if="auth.identity">
                      <div v-if="auth.identity.profile.avatar" class="ava ava_online ava_sm"
                           @click="activeMobMenu = false">
                        <router-link to="/profile">
                          <img class="ava__img" :src="'//api.hugword.com/media/' + auth.identity.profile.avatar.path"
                               :alt="auth.identity.profile.name">
                        </router-link>
                      </div>
                      <router-link v-else class="ava ava_online ava_sm ava_no-img" to="/profile"
                                   @click="activeMobMenu = false">
                        <span>{{ auth.identity.profile.name.substr(0, 1) }}</span>
                      </router-link>
                      <div class="auth__wrapper">
                        <span class="auth__name">{{ auth.identity.profile.name }}</span>
                        <span class="auth__status">Status:
                        <span class="auth__status-marked">
                        {{ auth.identity.profile.rankTitle }}</span>
                      </span>
                      </div>
                    </template>
                  </div>

                  <ul class="header-mobile__nav" @click="activeMobMenu = false">
                    <li v-if="auth.identity" class="dropdown-menu__item">
                      <router-link class="dropdown-menu__link" to="/profile">Profile</router-link>
                    </li>
                    <li v-else class="dropdown-menu__item">
                      <span class="dropdown-menu__link" @click="()=>{modals.login.show = true;}">Login/Sign Up</span>
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
                    <li v-if="auth.identity" class="dropdown-menu__item">
                      <span class="dropdown-menu__link" @click="logout">Log out</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <router-link class="nav__link chat-link search-svg" to="/" exact active-class="nav__link_active-icon">
              <inline-svg src="/icons/search.svg"/>
            </router-link>
            <router-link class="nav__link chat-link" to="/chat" active-class="nav__link_active-icon">
              <svg enable-background="new 0 0 511.34 511.34" height="25" viewBox="0 0 511.34 511.34" width="25"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m362.337 165.326h-213.334c-11.598 0-21 9.402-21 21s9.402 21 21 21h213.334c11.598 0 21-9.402 21-21s-9.402-21-21-21z"></path>
                <path
                  d="m309.003 250.66h-160c-11.598 0-21 9.402-21 21s9.402 21 21 21h160c11.598 0 21-9.402 21-21s-9.402-21-21-21z"></path>
                <path
                  d="m488.555 61.337c-2.164-5.527-6.566-9.881-12.118-11.983-79.418-30.055-361.166-30.415-441.533 0-5.552 2.103-9.954 6.456-12.118 11.983-.931 2.376-22.786 59.435-22.786 167.656s21.855 165.28 22.785 167.656c2.164 5.527 6.566 9.88 12.117 11.982 1.785.677 44.063 16.27 151.77 21.189l54.95 49.451c7.986 7.187 20.109 7.188 28.096 0l54.95-49.451c107.706-4.92 149.984-20.513 151.77-21.189 5.551-2.103 9.953-6.455 12.117-11.982.93-2.376 22.785-59.436 22.785-167.656s-21.856-165.28-22.785-167.656zm-36.12 310.649c-17.266 4.434-59.828 13.118-137.04 16.193-4.896.195-9.569 2.096-13.212 5.374l-46.513 41.857-46.513-41.857c-3.643-3.278-8.316-5.179-13.212-5.374-77.212-3.075-119.771-11.759-137.037-16.193-22.613-78.058-22.488-208.356-.006-285.978 90.707-23.234 302.927-23.208 393.532-.001 22.517 77.742 22.58 208.032.001 285.979z"></path>
              </svg>
            </router-link>
            <div class="notification" :class="{
              'notification_active': false
            }" @click="handlerOpenNotification">
              <button type="button" class="btn-icon">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="#b2bcc5">
                  <g>
                    <g id="bell">
                      <rect x="8" y="23" width="8" height="2" rx="1" ry="1"></rect>
                      <path
                        d="M24,21a4.94,4.94,0,0,0-1-3c-1-1-2-4-2-4V7s0-7-8-7H12V2h3s4,1,4,5v6a11.91,11.91,0,0,0,2,6H12v2Z"></path>
                      <path
                        d="M0,21a4.94,4.94,0,0,1,1-3c1-1,2-4,2-4V7s0-7,8-7h1V2H9S5,3,5,7v6a11.91,11.91,0,0,1-2,6h9v2Z"></path>
                    </g>
                  </g>
                </svg>
              </button>
              <NotificationDropdown :openNotification="openNotification" :notifications="notifications"/>
            </div>
          </div>
        </div>

      </header>

      <nuxt v-if="!layout.error" keep-alive :keep-alive-props="{ include: ['index', 'ambassador-id'], max: 1 }"/>
      <NotFound v-else/>

      <footer v-if="showFooter" class="footer">
        <div class="footer__row">
          <div class="logo">
            <inline-svg src="/icons/logo.svg"/>
          </div>
          <nav class="nav">
            <ul class="nav__container">
              <li class="nav__item ">
                <router-link tag="a" exact active-class="nav__link_active" class="nav__link" to="/">
                  Hug Search
                </router-link>
              </li>
              <li class="nav__item">
                <router-link class="nav__link" active-class="nav__link_active" to="/chat/">chat room</router-link>
              </li>
              <li class="nav__item">
                <router-link class="nav__link" active-class="nav__link_active" to="/help/">Help Center</router-link>
              </li>
            </ul>
          </nav>
          <div class="footer__item"><span class="footer__policy">Refund policy</span>
            <span class="footer__rights">© All rights reserved | 2020</span>
          </div>
        </div>
        <div class="footer__row">
          <div class="logo">
            <inline-svg src="/icons/logo.svg"/>
          </div>
          <div class="footer__item"><span class="footer__policy">Refund policy</span>
            <span class="footer__rights">© All rights reserved | 2020</span>
          </div>
        </div>
      </footer>
    </section>
    <div>
      <aside class="sidebar-right">
        <aside class="sidebar-right__header"></aside>
        <aside class="sidebar-right__content">
          <div class="push-card animated open-push" v-if="welcomeNotification">
            <span class="push-card__timer" :class="{'push-card__timer-active' : welcomeNotificationTimer}"
                  :style="{'transition': 120 + 's'}"> </span>
            <div class="push-card__content">
              <div class="ava ava_photo">
                <img class="ava__img" src="/img/ava-big.jpg">
                <div class="ava__append  ava__append_color_blue-icon">
                  <inline-svg src="/icons/push-icon.svg"/>
                </div>
              </div>
              <div class="push-card__wrap">
                <span class="push-card__title">Samantha </span>
                <span class="push-card__text">HugWord welcome team</span>
              </div>
            </div>
            <div class="push-card__row">
              <div class="push-card__text greeting-message">Hi friend! <br>
                Happy you are here! <br>
                <div>
                  Important notifications will
                  appear in this part of the screen
                  to make your experience more
                  interesting.
                </div>
                Have fun!
              </div>
            </div>
          </div>
          <PushCardList :pushes="isPushes"/>
        </aside>
      </aside>
      <aside class="sidebar-right-mobile">
        <div class="sidebar-right-mobile__open">
          <aside class="sidebar-right-mobile" :class="{'sidebar-right-mobile-open' :openSidebar}">
            <div class="sidebar-right-mobile__category-list">
              <PushCardList :pushes="isPushes"/>
            </div>
            <div class="sidebar-right-mobile__open" @click="setOpenSidebar">
              <div class="sidebar-right-mobile__open-bg">
                <img src="/icons/eye.svg">
                <span class="card-length" v-if="pushes">{{ pushes.length }}</span>
              </div>
            </div>
          </aside>
        </div>
      </aside>
    </div>
    <LoginModal :model="modals.login"/>
    <ForgotPasswordModal :modal="modals.forgot"/>
    <VerifyEmailModal :modal="modals.verification"/>
    <NeedTalkensModal :modal="modals.talkens"/>
    <PaymentModal :modal="modals.payment"/>
    <span v-if="$store.state.loading"><Loader/></span>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import TopicList from "~/components/layout/sidebar/topic-list.vue"
import ContactList from "~/components/layout/sidebar/contact-list.vue"
import Loader from "~/components/loader.vue"
import NotFound from "~/components/errors/not-found.vue"
import NotificationDropdown from "~/components/notification-dropdown.vue"
import VerifyEmailModal from "~/components/layout/modals/verify-email-modal.vue"
import NeedTalkensModal from "~/components/layout/modals/need-talkens-modal.vue"
import PaymentModal from "~/components/profile/modals/payment-modal.vue"
import PushCardList from "~/components/layout/notifications/push-card-list.vue"
import LoginModal from "~/layouts/login-modal.vue"
import ForgotPasswordModal from "~/components/user/modals/forgot-password-modal.vue"
import Auth from "~/components/layout/auth.vue"
import * as core from "~/types/core"
import * as chat from "~/types/chat"
import {IModals} from "~/plugins/services/glob";

export default Vue.extend({
  components: {
    NotFound, ContactList, TopicList, PushCardList, NotificationDropdown, Auth, Loader,
    LoginModal, ForgotPasswordModal, VerifyEmailModal, NeedTalkensModal, PaymentModal
  },
  data() {
    return {
      key: 0,
      loaded: false,
      pushes: [] as chat.TPush[],
      auth: this.$store.state.user,
      notifications: [] as chat.INotification[],
      openSidebar: false,
      welcomeNotification: false,
      welcomeNotificationTimer: false,
      openNotification: {show: false},
      activeMobMenu: false,
      opened: false,

      // $glob

      layout: {
        error: false
      },
      modals: {
        login: {
          show: false,
          done: null
        },
        forgot: {
          show: false
        },
        verification: {
          show: false
        },
        talkens: {
          show: false
        },
        payment: {
          show: false
        }
      } as IModals
    }
  },
  computed: {
    showFooter(): boolean {
      const excluded: string[] = ['chat', 'profile'];
      const exists = !excluded.includes(this.$route.name as string);

      if (exists) {
        for (const i in excluded) {
          if (this.$route.name?.startsWith(excluded[i] + '-')) {
            return false;
          }
        }
        return true;
      }

      return exists;
    },
    isAmbassador(): boolean {
      const ident = this.$store.getters['user/local'];
      return ident && ident.type == core.EUserType.Ambassador;
    },
    isPushes() : any{
      return  this.$ws.store!.data.pushes = this.pushes;
    }
  },
  created() {
    this.$ws.init();

    // TODO
    this.$glob.layout = this.layout;
    this.$glob.modals = this.modals;
    this.$ws.store!.data.pushes = this.pushes;
  },

  watch: {
    '$route.name'() {
      this.layout.error = false;
    },

  },

  methods: {
    setOpenSidebar() {
      this.openSidebar = !this.openSidebar
    },
    handlerOpenNotification() {
      this.openNotification.show = !this.openNotification.show;
    },
    handlerOpenMobMenu() {
      this.activeMobMenu = !this.activeMobMenu
    },
    hide() {
      this.openNotification.show = false;
      // this.activeMobMenu = false;
    },
    hideSidebar() {
      this.openSidebar = false;
    },
    hideAuth() {
      this.opened = false;
    },
    toggle() {
      this.opened = !this.opened;
    },
    logout() {
      this.$store.dispatch('user/logout');
      this.reload();
    },
    reload() {
      this.$router.push('/');
      this.$nextTick(() => {
        this.key++;
      })
    }
  },

  async mounted() {
    if (!this.$route.name?.startsWith('user-')) {
      await this.$store.dispatch('user/init');
    }

    this.welcomeNotificationTimer = true
    if (!localStorage.getItem('welcome') && this.auth.identity && this.auth.identity!.status === 0) {
      localStorage.setItem('welcome', '1');
      this.welcomeNotification = true;
      setTimeout(() => {
        this.welcomeNotification = false;
      }, 120000);
    }

    if (process.client && this.auth.identity && !this.$ws.socket) {
      this.$ws.connect(this.auth.identity.id, this.auth.token);
    }

    if (this.auth.identity) {
      this.notifications = await this.$store.dispatch('notification/all');
    }
  },

  async fetch() {
    if (!this.$route.name?.startsWith('user-')) {
      await this.$store.dispatch('user/init');
    }

    this.loaded = true;
    this.layout.error = false;
  },
  fetchOnServer: false
})
</script>

<style lang="scss">
.header-mobile__close {
  cursor: pointer;
}
</style>
