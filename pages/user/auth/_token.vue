<template>
  <div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async fetch() {
    await this.$store.dispatch('user/logout');
    await this.$store.dispatch('user/init', this.$route.params.token)
    if (this.$store.state.user.id) {
      await this.$router.push('/profile');
    } else {
      await this.$router.push('/');
    }
  },
  fetchOnServer: true
})
</script>
