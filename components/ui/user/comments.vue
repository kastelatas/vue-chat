<template>
  <div v-if="comments.length">
    <div v-for="comment in comments.slice(0, 3)" class="comment">
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
            <div class="comment__date">{{ comment.created_at | date }}</div>
          </div>
          <Rating class="profile__row" :text="false" :rating="comment.rating"/>
        </div>
        <div class="comment__title"></div>
      </div>
      <div class="comment__text">{{ comment.message }}</div>
    </div>
  </div>
  <div v-else class="empty-state">No Comments</div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import Rating from '~/components/ui/user/rating.vue'
import * as core from '~/types/core'

export default Vue.extend({
  components: {Rating},
  props: {
    comments: {
      required: true,
      type: Array as PropType<core.IAmbassadorProfileComment[]>,
    },
  }
})
</script>
