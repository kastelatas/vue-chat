<template>
  <div v-if="user" class="chat__profile">
    <button type="button" class="btn-icon chat__profile-icon-down chat__profile-icon-down_hide">
        <span class="btn-icon__content">
          <inline-svg src="/icons/arrow-down.svg" v-if="profile.show == true" @click="profile.show = !profile.show"/>
          <inline-svg src="/icons/arrow-up.svg" v-if="profile.show == false" @click="profile.show = !profile.show"/>
        </span>
    </button>

    <button type="button" class="btn-icon chat__profile-icon-left" v-if="contact && profile.show">
      <router-link :to="'/id/' + contact.user.id" class="btn-icon__content">
        <inline-svg src="/icons/arrow-down.svg"/>
      </router-link>
    </button>

    <div class="ava ava_lg" v-if="user.profile.avatar && profile.show">
      <router-link :to="'/id/' + user.id">
        <img v-if="user" class="ava__img" :src="user.profile.avatar.path | media(144)" :alt="user.profile.name">
      </router-link>
    </div>

    <router-link v-if="user" :to="'/id/' + user.id" class="chat__profile-title">
      {{ user.profile.name }}
    </router-link>

    <div v-if="profile.show">
        <span v-if="user" class="chat__profile-status" :class="{'chat__profile-status_online': user.state.online}">
          {{ user.state.online ? 'Online' : 'Offline' }}
        </span>
     <div class="chat__profile-row">
       <Rating class="chat__profile-vote-overlay" :text="false" :rating="user && user.profile.rating ? user.profile.rating.rating : 0"/> &nbsp;
       <span v-if="user.type !== 1">(  {{user.profile.comments && user.profile.comments.length}} )</span>
     </div>
      <br>

      <button v-if="reviewIsAllowed" type="button" class="btn" @click="reviewModal.show = true">
        LEAVE A REVIEW
      </button>

      <template v-if="user && user.profile.topics.length">
        <h2>Topics of conversation</h2>
        <Topics :topics="user.profile.topics"/>
      </template>

      <template v-if="user.profile.photos && user.profile.photos.length">
        <h2>{{ user.profile.name }} photos</h2>
        <div class="carousel carousel__profile">
          <Photos :photos="user.profile.photos" :per-page-custom="[[320,2], [1920,3]]" @click="showPhotosLightbox"/>
        </div>
      </template>

      <template v-if="user.profile.description">
        <h2 v-if="user">About {{ user.profile.name }}</h2>
        <p v-if="user" class="chat__description">{{ user.profile.description }}</p>
      </template>
    </div>

    <div v-if="photosLightboxData">
      <light-box ref="lightbox" :show-footer-count="photosLightboxData.length > 1"
        :show-thumbs="photosLightboxData.length > 1" :show-light-box="false"
        :media="photosLightboxData"
      />
    </div>

    <AddReviewModal :model="reviewModal" :user="user" @done="onReviewAdded"/>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue"
import Rating from "~/components/ui/user/rating.vue"
import Topics from "~/components/ui/user/topics.vue"
import Photos from "~/components/ui/user/photos.vue"
import AddReviewModal from "~/components/profile/modals/add-review-modal.vue"
import * as chat from "~/types/chat"
import * as core from "~/types/core"
import extend from "lodash/extend"

export default Vue.extend({
  components: {Rating, Topics, Photos, AddReviewModal},
  props: {
    contact: {
      type: Object as PropType<chat.IContact>
    },
    user: {
      required: true,
      type: Object as PropType<core.IAmbassador | core.IClient>
    },
    profile: {
      required: true,
      type: Object as PropType<{ show: boolean }>
    },
  },
  data() {
    return {
      reviewed: false,
      reviewModal: {show: false}
    };
  },
  computed: {
    reviewIsAllowed(): boolean {
      const ident = this.$store.getters['user/local'];
      const allow = ident && ident.status && (ident.type == core.EUserType.Client);
      if (allow && this.user.profile.hasOwnProperty('state')) {
        return !this.user.profile['state'].reviewed;
      }
      return false;
    },
    photosLightboxData(): core.ILightBoxImage[] | null {
      const media: core.ILightBoxImage[] = [];
      const filters = this.$options.filters!;
      if (this.user!) {
        for (const photo of this.user!.profile.photos) {
          media.push({
            src: filters.media(photo.image.path),
            thumb: filters.media(photo.image.path, 135, 118),
          });
        }
      }
      return media.length ? media : null;
    },
  },
  methods: {
    async onReviewAdded() {
      const user = await this.$store.dispatch('user/one', {id: this.user.id});
      extend(this.user, user);
    },
    showPhotosLightbox(index: number) {
      this.$refs.lightbox['showImage'](index);
    },
  },
});
</script>

<style lang="scss" >
.chat__profile {
  .VueCarousel-navigation {
    top: -16px;
  }

  .VueCarousel-navigation button:nth-child(1){
    right:22px;

    &:after {
      left: 29px;
    }
  }

  .VueCarousel-navigation  button:nth-child(2) {
    right: 23px;
  }

}

</style>
