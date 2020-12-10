<template>
  <div class="profile__header" :class="headerClass">
    <img v-if="cover" class="profile__img" :src="cover | media" alt="">
    <router-link to="/" class="btn-icon btn-icon_type_close">
      <span class="btn-icon__content"><inline-svg src="/icons/close.svg"/></span>
    </router-link>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as core from '~/types/core'

export default Vue.extend({
  props: {
    gender: {
      type: [Number, String],
      default: null,
    },
    cover: {
      type: String,
      default: null,
    },
    loaded: {
      type: Boolean,
      default: true,
    }
  },
  mounted() {
    console.log({router: this.$router});
  },
  computed: {
    headerClass(): string | null {
      if (!this.cover) {
        if (this.gender) {
          switch (Number(this.gender)) {
            case core.EUserGender.Male:
              return 'profile__header_blue';
            case core.EUserGender.Female:
              return 'profile__header_pink';
          }
        } else {
          return this.loaded ? 'profile__header_brown' : null;
        }
      }

      return null;
    }
  }
})
</script>

