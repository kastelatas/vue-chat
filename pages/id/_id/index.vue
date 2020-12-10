<template>
  <div v-if="user" class="profile__wrapper">
    <div class="profile__content" @scroll="onScroll">
      <div class="profile__row">
        <div class="profile__about profile__about_pad">
          <div class="profile__aside animated fadeInUp ">
            <div v-if="user.profile.description">
              <h3 class="profile__title">About {{ user.profile.name }}</h3>
              <p class="profile__text">{{ user.profile.description }}</p>
              <div v-if="!isAmbassador" class="profile__description">
                <div class="profile__icon">
                  <inline-svg src="/icons/main-billing.svg"/>
                </div>
                <span class="profile__description-text">
                    Cost of one massage:
                    <span class="profile__description-mark">
                      {{ user.profile.price }} talken(s)
                    </span>
                  </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="user.profile.comments" class="profile__comments animated fadeInUp">
          <div class="profile__title">Reviews ({{ user.profile.comments.length }})</div>
          <div class="profile__comments-content">
            <Comments :comments="user.profile.comments"/>
          </div>
        </div>
      </div>
      <div class="profile__row profile__about_pad profile__fix-row animated fadeInUp">
        <div class="profile__col profile__row-settings">
          <router-link class="btn btn_icon" :to="'/chat/' + user.id">
            <inline-svg src="/icons/speech-bubble.svg"/>
            <span>Start chat</span>
          </router-link>
        </div>

        <router-link v-if="isAuth && user.profile.comments.length > 3" class="btn " :to="'/id/' + user.id + '/reviews'">
          <span>Show more</span>
        </router-link>
      </div>

      <div v-if="user.profile.photos.length" class="animated fadeInUp">
        <h3 class="profile__title">{{ user.profile.name }} photos</h3>
        <Photos
          :photos="user.profile.photos"
          :per-page-custom="[[1920,10], [1440,6], [1360,5], [1024,7], [991,6], [768,5], [425, 3], [375,3], [320,2] ]"
          @click="showPhotosLightbox"/>
      </div>

      <div v-if="user.profile.videos && user.profile.videos.length" class="animated fadeInUp">
        <h3 class="profile__title">{{ user.profile.name }} videos</h3>
        <Videos :videos="user.profile.videos"/>
      </div>

      <div v-if="user.profile.topics.length" class="animated fadeInUp">
        <h3 class="profile__title ">Right now {{ user.profile.name }} wants to talk about</h3>
        <Topics :topics="user.profile.topics"/>
      </div>
    </div>
    <client-only v-if="photosLightboxData">
      <light-box ref="lightbox" :show-footer-count="photosLightboxData.length > 1" :show-thumbs="photosLightboxData.length > 1" :show-light-box="false" :media="photosLightboxData"/>
    </client-only>
  </div>
</template>

<style>
.nav__link_active {
  color: #3faaff !important;
  text-decoration: underline !important;
}
</style>

<script lang="ts">
import Vue, {PropType} from 'vue'
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
  auth: core.IAuth | null,
  scroll: boolean,
  showReviews: boolean
}

export default Vue.extend({
  components: {Header, Rating, Topics, Photos, Videos, Comments, Sorting, DropdownMenu},
  props: {
    scrolled: {
      required: true,
      type: Object as PropType<{value: boolean}>
    }
  },
  data(): IData {
    return {
      user: null,
      auth: null,
      scroll: false,
      showReviews: false
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
    isAuth(): boolean {
      return !!this.$store.getters['user/local'];
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
    onScroll({target}: { target: HTMLElement }) {
      this.scrolled.value = (target.scrollTop > 50);
    },
  },
  async fetch() {
    const id = this.$route.params.id;
    this.auth = await this.$store.dispatch('user/init');
    this.user = await this.$store.dispatch('user/one', {id});
    if (!this.user) {
      this.$router.push('/404');
    }
  },
  fetchOnServer: false
})
</script>


