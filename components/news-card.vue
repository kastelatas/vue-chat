<template>
  <div class="news-card">
    <div class="news-card__img">
      <img v-if="news.preview" :src="news.preview.path | media" alt="news_img"/>
    </div>

    <h2 class="news-card__title">{{ news.title }}</h2>
    <div class="news-card__date">{{ new Date(news.published_at * 1000).toLocaleDateString() }}</div>

    <p class="news-card__text">{{ news.description }}</p>
    <div class="news-card__action">
      <router-link
        :to="{ name: 'news-id', params: { id: news.id }}"
        class="btn"
      >
        Read more
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['news']
}
</script>
