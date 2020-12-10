<template>
  <div>
    <span class="rating-stars" :style="{width: width + 'px', cursor: edit ? 'pointer' : 'default'}"
      @mousemove="move" @mouseleave="leave" @click="click">
      <span class="rating-stars-back-over" :style="{width: 100 - percents + '%'}">
        <span class="rating-stars-back" :style="{width: width + 'px'}"></span>
      </span>
      <span class="rating-stars-front-over" :style="{width: percents + '%'}">
        <span class="rating-stars-front" :style="{width: width + 'px'}"></span>
      </span>
    </span>
    <span v-if="text" class="person-card__stars-counter">
      ({{ rating }})
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      current: {
        rating: 0
      }
    }
  },
  props: {
    rating: {
      required: true,
      type: Number,
    },
    width: {
      type: Number,
      default: 140
    },
    text: {
      default: false,
      type: Boolean,
    },
    edit: {
      required: false,
      type: Boolean
    }
  },

  computed: {
    percents(): number {
      return Math.trunc(this.current.rating * 20);
    }
  },

  methods: {
    click() {
      this.edit && this.$emit('click', this.current.rating);
    },
    move(e) {
      if (this.edit) {
        this.current.rating = 5 / (e.currentTarget.offsetWidth / e.offsetX);
      }
    },
    leave() {
      if (this.edit) {
        this.current.rating = this.rating;
      }
    }
  },

  fetch() {
    this.current.rating = this.rating;
  },

  fetchOnServer: true
})
</script>

<style lang="scss">

.rating-stars {
  position: relative;
  width: 140px;
  height: 22px;

  &-back-over {
    right: -5px;
    position: absolute;
    overflow: hidden;
    display: block;
    width: 100%;
    height: 100%;
  }

  &-back {
    right: 0;
    position: absolute;
    display: block;
    width: 140px;
    height: 100%;
    background: url('/icons/star-vote.svg') space right;
  }

  &-front-over {
    left: 0;
    position: absolute;
    overflow: hidden;
    display: block;
    width: 100%;
    height: 100%;
  }

  &-front {
    left: 0;
    position: absolute;
    display: block;
    width: 140px;
    height: 100%;
    background: url('/icons/star-full.svg') space;
  }
}

</style>
