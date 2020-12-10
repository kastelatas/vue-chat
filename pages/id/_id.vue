<template>
  <div>
    <div>
      <div v-if="user" class="profile reviews ambassador-profile">
        <div class="tabs-mobile">
          <ul class="tabs">
            <li class="tabs-nav__item" @click="showReviews = false">
              <router-link :to="'/id/' + user.id" class="btn-icon__content"
                :class="{'nav__link_active': $route.name === 'id-id'}">
                About ambassador
              </router-link>
            </li>
            <li class="tabs-nav__item">
              <router-link :to="'/id/' + user.id + '/reviews'" @click="showReviews = true" class="btn-icon__content"
                active-class="nav__link_active">
                Reviews
              </router-link>
            </li>
          </ul>
        </div>
        <Header :gender="user.profile.gender" :cover="user.profile.cover ? user.profile.cover.path : null">
          <div slot="content" class="profile__person-block person-ambassador">
            <div class="profile__person" :class="{'profile__person_top':  scrolled.value}">
              <div style="margin-right: 40px;">
                <div class="profile__ava-container animated zoomIn">
                  <div class="ava ava_lg ava_border">
                    <img v-if="user.profile.avatar" class="ava__img" :src="user.profile.avatar.path | media(144)"
                      :alt="user.profile.name">
                    <span v-else class="ava__img ava_no-img">{{ user.profile.name.substr(0, 1) }}</span>
                  </div>
                </div>
              </div>
              <div class="profile__block-rate">
                <h3 class="profile__title profile__title_colored">{{ user.profile.name }}</h3>
                <Rating v-if="!isAmbassador" class="profile__row" :text="false"
                  :rating="user.profile.rating ? user.profile.rating.rating: 0"/>
              </div>
            </div>
          </div>
        </Header>
        <nuxt-child :scrolled="scrolled"/>
      </div>
    </div>
  </div>
</template>

<style>
.nav__link_active {
  color: #3faaff !important;
  text-decoration: underline !important;
}
</style>

<script lang="ts">
import Vue from "vue"
import DropdownMenu from "@innologica/vue-dropdown-menu"
import Sorting from "~/components/layout/sorting.vue"
import Header from "~/components/profile/header.vue"
import Rating from "~/components/ui/user/rating.vue"
import Topics from "~/components/ui/user/topics.vue"
import Photos from "~/components/ui/user/photos.vue"
import Videos from "~/components/ui/user/videos.vue"
import Comments from "~/components/ui/user/comments.vue"
import * as core from "~/types/core"

interface IData {
  user: core.IAmbassador | null,
  scroll: boolean,
  showReviews: boolean
  scrolled: { value: boolean },
}

export default Vue.extend({
  components: {Header, Rating, Topics, Photos, Videos, Comments, Sorting, DropdownMenu},
  data(): IData {
    return {
      scrolled: {value: false},
      user: null,
      scroll: false,
      showReviews: false,
    }
  },
  computed: {
    photosLightboxData(): core.ILightBoxImage[] | null {
      const media: core.ILightBoxImage[] = [];
      const filters = this.$options.filters!;
      if (this.user) {
        for (const photo of this.user!.profile.photos) {
          media.push({
            src: filters.media(photo.image.path),
            thumb: filters.media(photo.image.path, 135, 118),
          });
        }
      }
      return media.length ? media : null;
    },

    isAmbassador(): boolean {
      const ident = this.$store.getters['user/local'];
      return ident && ident.type == core.EUserType.Ambassador;
    },
  },
  methods: {
    showPhotosLightbox(index: number) {
      this.$refs.lightbox['showImage'](index);
    },
  },
  async fetch() {
    const id = this.$route.params.id;
    this.user = await this.$store.dispatch('user/one', {id});
  },
  fetchOnServer: false
})
</script>


