<template>
  <div class="news-page">
    <h1 class="news-page__title">Our News</h1>
    <div class="news-page__content">
      <NewsCard
        v-for="news in allNews"
        :key="news.id"
        :news="news"
      />
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import NewsCard from '../../components/news-card'

export default Vue.extend({
  data() {
    return {
      allNews: []
    }
  },
  components: {NewsCard},

  async fetch() {
    const allnews = await this.$store.dispatch('getNews');
    // const allnews = this.$store.state.news
    this.allNews = allnews
  },
  fetchOnServer: true
})

</script>
