<template>
  <div class="article" v-if="page">
    <h2>{{ page.title }}</h2>
    <div v-html="page.content"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as core from "@/types/core";

export default Vue.extend({
  data() {
    return {
      page: [] as core.IPage[] | void
    }
  },
  async fetch() {
    const slug = this.$route.params.slug;
    this.page = await this.$store.dispatch('page/page', slug).then(data => data, errors => {
      console.log(errors)
    })
    console.log(this.page)
  },
  fetchOnServer: true
})

</script>
