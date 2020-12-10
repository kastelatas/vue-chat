<template>
  <div class="article">
    <div class="news-card__img">
      <img v-if="currNews.photo" :src="currNews.photo.path | media" alt="news_img"/>
    </div>
    <div v-html="currNews.content"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      currNews: [],
      newsId: this.$route.params.id
    }
  },
  mounted() {

  },
  async fetch() {
    const current = await this.$store.dispatch('getNewsById', {id: this.$route.params.id});
    this.currNews = current
  },
  fetchOnServer: true
})
</script>
