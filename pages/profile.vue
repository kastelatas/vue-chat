<template>
  <div class="profile profile_type_user">
    <div v-show="$route.name !== 'profile-reviews'" class="tabs-mobile">
      <Tabs/>
    </div>
    <Header :gender="personal.data.gender" :cover="media.data.cover" :loaded="loaded">
      <div slot="content">
        <button class="btn btn_change btn_icon" type="button" @click="onCoverChange">
          <inline-svg src="/icons/camera.svg"/>
          <span class="change-photo">Change Photo</span>
        </button>
        <form @submit.prevent="blur" class="profile__person-block">
          <div class="profile__person" :class="{'profile__person_top': scroll}">
            <div class="profile__ava-container animated zoomIn">
              <div class="ava ava_lg  ava_border" :class="{'ava_no-img': !media.data.avatar}">
                <img v-if="media.data.avatar" :src="media.data.avatar | media(156)"/>
              </div>
              <button type="button" class="btn-icon btn-icon_type_edit" @click="onAvatarChange">
              <span class="btn-icon__content">
                <inline-svg src="/icons/pencil.svg"/>
              </span>
              </button>
              <div class="profile__degree-block"></div>
            </div>
            <div class="profile__col profile__status-block">
              <span class="profile__user-name">Status</span>
              <span class="profile__status">
                {{ user.identity && user.identity.profile.rankTitle }}
              </span>
              <div class="profile__status-icons">
                <div class="achiev-icon achiev-icon_gold">
                  <inline-svg src="/icons/star-achiev.svg"/>
                </div>
                <div class="achiev-icon achiev-icon_platinum">
                  <inline-svg src="/icons/star-achiev.svg"/>
                </div>
                <div class="achiev-icon achiev-icon_blue">
                  <inline-svg src="/icons/star-achiev.svg"/>
                </div>
              </div>
            </div>
          </div>
          <h3 class="profile__title profile__title_colored desktop-title">
          <span class="profile-element">
            <input
              ref="input-name" name="name" v-model="personal.data.name"
              class="edit-text edit-text_type_input edit-text_text_bold" maxlength="20"
              placeholder="Enter your name" @focus="focus.name = true" @blur="focus.name = false">
            <button v-show="!focus.name" type="button" class="btn-icon "
              @click="focus.name = true; $refs['input-name'].focus()">
              <inline-svg src="/icons/pencil.svg"/>
            </button>
            <span v-show="personal.errors.name" class="error input-group__invalid">{{ personal.errors.name }}</span>
          </span>
          </h3>
        </form>
      </div>
    </Header>
    <div class="profile__wrapper" v-if="loaded">
      <div class="profile__content" @scroll="onScroll">
        <div v-show="$route.name !== 'profile-reviews'" class="profile__row">
          <div class="profile__about animated fadeInUp">
            <div class="profile__aside">
              <div><h3 class="profile__title">About You ({{ descriptionLength }}/400)</h3>
                <button v-show="!focus.description" type="button" class="btn-icon focus-btn-profile"
                  @click="focus.description = true; $refs['input-description']['$el'].focus()">
                  <inline-svg src="/icons/pencil.svg"/>
                </button>
                <textarea-autosize ref="input-description" name="description" class="edit-text" maxlength="400"
                  v-model="personal.data.description" placeholder="Enter text about you" rows="1" :max-height="200"
                  @focus.native="focus.description = true" @blur.native="focus.description = false"></textarea-autosize>
              </div>
            </div>
          </div>
          <div v-if="isAmbassador">
            <div class="profile__comments animated fadeInUp">
              <div class="profile__title">Reviews ({{ personal.data.comments && personal.data.comments.length }})</div>
              <div class="profile__comments-content">
                <Comments :comments="personal.data.comments"/>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isAmbassador && $route.name !== 'profile-reviews'"
          class="profile__row profile__about_pad profile__fix-row animated fadeInUp">
          <div class="profile__col profile__row-settings">
            <div class="price-settings">
              <div class="price-settings__svg-right">
                <inline-svg src="/icons/talk-earned.svg"/>
              </div>
              <div class="price-settings__row">
                <div class="price-settings__row">
                  <span class="price-settings__line-text ">Price settings</span>
                  <span class="price-settings__line-text-light ">talkens per message</span>
                </div>
              </div>
              <div class="counter">
                <!--                <button type="button" class="btn-icon">-->
                <!--                  <span class="btn-icon__content">-->
                <!--                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" fill="#acb5c3"><g><g><rect y="6" width="14" height="2" rx="2" ry="1"></rect></g></g></svg></span>-->
                <!--                </button>-->
                <div class="counter__count">{{ price }}</div>
                <!--                <button type="button" class="btn-icon">-->
                <!--                  <span class="btn-icon__content">-->
                <!--                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" fill="#acb5c3"><g><g><rect y="6" width="14" height="2" rx="2" ry="1"></rect><rect x="6" width="2" height="14" rx="1" ry="1"></rect></g></g></svg></span>-->
                <!--                </button>-->
              </div>
              <div class="price-settings__helper" data-toggle="Lorem ipsum dolore price">?</div>
            </div>
          </div>
          <router-link v-if="personal.data.comments.length > 3" class="btn reviews-btn" to="/profile/reviews">
            <span>Show more</span>
          </router-link>
        </div>
        <br>
        <div class="tabs-row">
          <Tabs v-if="user.identity" v-show="$route.name !== 'profile-reviews'" :userType="user.identity.type"/>
          <div class="tabs__pannel">
            <nuxt-child :personal="personal" :security="security" :settings="settings" :media="media"
              :statistics="statistics"/>
          </div>
          <Tabs class="tabs_bottom" v-if="user.identity" v-show="$route.name !== 'profile-reviews'"
            :userType="user.identity.type"/>
        </div>
      </div>
    </div>

    <ImageUploadModal :model="modals.imageUpload" @done="done"/>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tabs from '~/components/profile/tabs.vue'
import Comments from '~/components/ui/user/comments.vue'
import Header from '~/components/profile/header.vue'
import ImageUploadModal from '~/components/profile/modals/image-upload-modal.vue'
import * as core from '~/types/core'
import {IProfilePhoto, IProfileVideo, IProfileTopic, EUserType} from '~/types/core'
import Loader from '~/components/loader.vue'
import set from "lodash/set"

const def = () => {
  return {
    personal: {
      data: {
        name: ' ',
        description: ' ',
        gender: null as number | null,
        topics: [] as IProfileTopic[],
        comments: []
      },
      errors: {
        name: '',
        description: '',
        gender: '',
        topics: ''
      }
    },

    security: {
      data: {
        email: '',
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      errors: {
        email: '',
        old_password: '',
        new_password: '',
        confirm_password: '',
      }
    },

    media: {
      data: {
        avatar: null as string | null,
        cover: null as string | null,
        photos: [] as IProfilePhoto[],
        videos: [] as IProfileVideo[],
      },
      errors: {
        avatar: '',
        cover: '',
        photos: '',
        videos: ''
      }
    },

    settings: {
      data: {
        notification_all: false,
        notification_news: false,
        notification_comments: false,
        notification_achievements: false,
        notification_reactions: false,
        notification_birthdays: false,
        email_all: false,
        email_news: false,
        email_achievements: false,
        email_financial_transactions: false,
        email_monthly_analytics: false,
      },
      errors: {
        notification_all: '',
        notification_news: '',
        notification_comments: '',
        notification_achievements: '',
        notification_reactions: '',
        notification_birthdays: '',
        email_all: '',
        email_news: '',
        email_achievements: '',
        email_financial_transactions: '',
        email_monthly_analytics: '',
      }
    },

    statistics: {}
  }
}

export let state = def();
export type IPersonal = typeof state.personal;
export type ISecurity = typeof state.security;
export type ISettings = typeof state.settings;
export type IMedia = typeof state.media;
export type IStatistics = typeof state.statistics;

export default Vue.extend({
  components: {Header, Tabs, ImageUploadModal, Loader, Comments},
  data() {
    return {
      loaded: false,
      focus: {
        name: false,
        description: false
      },
      modals: {
        imageUpload: {show: false, mode: ''},
      },
      scroll: false,
      loader: true,
      price: 1,
      ...state
    }
  },
  computed: {
    user(): core.IAuth | null {
      return this.$store.state.user;
    },
    isAmbassador(): boolean {
      return (this.$store.state.user.identity && this.$store.state.user.identity.type == EUserType.Ambassador);
    },
    descriptionLength(): number {
      return this.personal.data.description !== ' '
        ? this.personal.data.description
          ? this.personal.data.description.length
          : 0
        : 0
    }
  },

  methods: {
    blur() {
      (<HTMLElement>document.activeElement).blur();
    },
    onScroll({target}: { target: HTMLElement }) {
      this.scroll = (target.scrollTop > 50);
    },
    onAvatarChange() {
      this.modals.imageUpload.mode = 'avatar';
      this.modals.imageUpload.show = true;
    },
    onCoverChange() {
      this.modals.imageUpload.mode = 'cover';
      this.modals.imageUpload.show = true;
    },
    done(payload: { mode: string, image: core.IImage }) {
      if (['avatar', 'cover', 'photo'].includes(payload.mode)) {
        const data = {};
        const attribute = payload.mode + '_id';
        data[attribute] = payload.image.id;
        data[payload.mode] = payload.image;

        this.media.data[payload.mode] = payload.image.path;
        this.$store.commit('user/set', {identity: {profile: data}});
        this.$store.dispatch('profile/save', set({}, attribute, payload.image.id));
      }
    }
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    document.querySelector('.profile__content')!.scrollTo(0, 0);
    await this.$fetch();
  },

  async fetch() {
    await this.$store.dispatch('user/init');
    const user = await this.$store.dispatch('user/load');

    state = def();
    this.personal.data = user.profile; // TODO
    this.security.data.email = user.email;
    this.media.data.photos = user.profile.photos;
    this.media.data.videos = user.profile.videos;
    this.media.data.avatar = user.profile.avatar ? user.profile.avatar.path : null;
    this.media.data.cover = user.profile.cover ? user.profile.cover.path : null;
    Object.assign(this.settings.data, user.setting);

    this.security.data.email = user.email;

    this.$nextTick(() => {
      this.$store.dispatch('topics');
      this.loaded = true;
    });
  },
  fetchOnServer: true
})
</script>

<style lang="scss">

.profile {
  .edit-text input {
    background: transparent;
  }

  &__person-block {
    &__title {
      height: 16px;
    }
  }


  .profile-element {
    position: relative;

    input {
      width: auto;
    }

    .btn-icon {
      position: absolute;
      left: -30px;
      top: 4px;
    }
  }

  .profile__header {
    .profile-element {
      input::placeholder {
        color: #bbb;
        font-size: 0.9em;
      }
    }
  }

  .profile__title {
    .error {
      color: #ff3f59;
      position: relative;
      top: -13px;
    }

    &.desktop-title {
      height: 20px; // DEV TMP
      input {
        padding-bottom: 10px;

        &:focus {
          border-bottom: 1px solid white;
        }
      }
    }
  }

  .profile__about {
    textarea {
      padding-left: 17px;
      border-bottom: 1px solid transparent;
      padding-bottom: 10px;

      &:focus {
        border-color: #ddd;
      }
    }

    .profile__aside {
      position: relative;

      .btn-icon {
        position: absolute;
        top: 95px;
        left: -4px;
      }


    }
  }

  .profile-personals {
    &__input-wrapper {
      width: 100%;
    }
  }
}
</style>
