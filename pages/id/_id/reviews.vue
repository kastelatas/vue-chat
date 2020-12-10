<template>
  <div class="reviews">
    <div class="reviews__row reviews__row-pd reviews__pd-content"></div>
    <div class="reviews__list reviews__pd-content">
      <div class="comment" v-for="(comment, index) in comments" :key="index">
        <div class="comment__header">
          <div class="ava ava_sm">
            <img v-if="comment.client.profile.avatar" class="ava__img"
              :src="comment.client.profile.avatar.path | media(52)"
              :alt="comment.client.profile.name">
            <span v-else class="ava__img ava_no-img">{{ comment.client.profile.name.substr(0, 1) }}</span>
          </div>
          <div class="comment__wrapper">
            <div class="comment__title">
              <div class="comment__name">{{ comment.client.profile.name }}</div>
              <div class="comment__date">{{ new Date(comment.created_at * 1000).toLocaleDateString() }}</div>
            </div>
            <Rating :text="false" :rating="comment && comment.rating ? comment.rating : 0"/>
          </div>
          <div class="comment__title"></div>
        </div>
        <div class="comment__text">{{ comment.message }}</div>
      </div>

      <infinite-loading @infinite="load">
        <div slot="no-more">No more</div>
        <div slot="no-results">No results</div>
      </infinite-loading>
    </div>
    <div class="reviews__row">
      <div class="reviews__btn-block">
        <router-link class="btn" :to="'/id/' + $route.params.id">
          <span>Back to Profile</span>
        </router-link>
        <!--        <router-link v-if="allow" class="btn" to="/">-->
        <!--          <span>Leave a Review</span>-->
        <!--        </router-link>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Rating from "~/components/ui/user/rating.vue"
import * as core from "~/types/core";

export default Vue.extend({
  components: {Rating},
  data() {
    return {
      page: 1,
      comments: [] as core.IAmbassadorProfileComment[]
    }
  },

  computed: {
    user(): core.IAmbassador | null {
      return this.$store.state.user.current;
    },
    allow(): boolean {
      const ident = this.$store.getters['user/local'];
      const allow = ident && ident.status && (ident.type == core.EUserType.Client);
      if (allow && this.user && this.user.profile.hasOwnProperty('state')) {
        return !this.user.profile['state'].reviewed;
      }
      return false;
    }
  },

  methods: {
    async load($state) {
      const comments = await this.$store.dispatch('user/reviews', {
        id: this.$route.params.id, page: this.page
      });

      if (comments.length) {
        this.page += 1;
        this.comments.push(...comments);
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },

  fetchOnServer: true
})
</script>


<style>
.reviews__btn-block {
  margin-bottom: 20px;
}
</style>
