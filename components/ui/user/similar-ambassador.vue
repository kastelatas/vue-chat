<template>
  <div>
    <carousel
      :per-page-custom="[[1920,3]]"
      :paginationEnabled="false"
      :navigationEnabled="true"
      :navigation-next-label="navigationNext"
      :navigation-prev-label="navigationPrev"

    >
      <slide v-for="(similar, index) in similar" :key="index">
        <div class="mini-card">
          <router-link :to="'/id/' + similar.id">
            <img class="ava__img ava_sm"
              :src="similar.profile.avatar.path | media(26, 26)"
            >
          </router-link>
          <div class="mini-card__text">{{ similar.profile.name }}</div>
          <span class="btn-icon btn-icon_type_message">
            <span class="btn-icon__content">
               <router-link :to="'/chat/' + similar && similar.id">
                 <inline-svg src="/icons/speech-bubble.svg"/>
               </router-link>
            </span>
          </span>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    similar: {
      type: Array
    }
  },
  data() {
    return {
      userId: null
    }
  },
  computed: {
    navigationNext: function () {
      return ` <img src="/icons/arrow-right.svg" />`
    },
    navigationPrev: function () {
      return ` <img src="/icons/arrow-left.svg" />`
    },
  },
})
</script>


<style lang="scss">
.sidebar-contact {
  .VueCarousel-navigation {
    top: -59px;
  }
}
</style>
