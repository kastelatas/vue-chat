<template>
  <div class="reviews">
    <div class="reviews__row reviews__row-pd reviews__pd-content" style="padding-top: 120px">
    </div>
    <div class="reviews__list reviews__pd-content">
      <div class="comment" v-for="comment in personal.data.comments">
        <div class="comment__header">
          <div class="ava ava_sm">
            <img class="ava__img" :src="$options.filters.media(comment.client.profile.avatar.path)" alt="img">
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
    </div>
    <div class="reviews__row">
      <div class="reviews__btn-block">
        <router-link class="btn" to="/profile">
          <span>Back to Profile</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import Rating from "@/components/ui/user/rating.vue"
import {IPersonal} from "~/pages/profile.vue";

export default Vue.extend({
  components: {Rating},
  props: {
    personal: {type: Object as PropType<IPersonal>, required: true},
  },
})
</script>
