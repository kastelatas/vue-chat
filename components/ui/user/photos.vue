<template>
  <carousel
    v-if="photos.length"
    :per-page="$props.perPage"
    :per-page-custom="$props.perPageCustom"
    :navigationEnabled="true"
    :paginationEnabled="false"
    :navigation-next-label="navigationNext"
    :navigation-prev-label="navigationPrev"
  >
    <slide v-for="(photo, index) in photos" :key="index" :data-key="index">
      <div class="carousel-item">

        <div class="carousel-item__img" @click="click(index)" :style="{
          'background-image': 'url(\'' + $options.filters.media(photo.image.path, 108, 118) + '\')'
        }"></div>
        <button v-if="edit" @click.prevent="remove(photo)" class="btn-icon btn-icon_type_close-photo" title="Remove">
          <span class="btn-icon__content">
            <inline-svg src="/icons/close.svg"/>
          </span>
        </button>
      </div>
    </slide>
  </carousel>
  <span v-else>No photos</span>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import * as core from '~/types/core'

export default Vue.extend({
  props: {
    photos: {
      required: true,
      type: Array as PropType<core.IProfilePhoto[]>,
    },
    edit: {
      type: Boolean,
      required: false
    },
    perPage: {
      default: 8,
      type: Number,
      required: false
    },
    perPageCustom: {
      default: [[320, 2], [1199, 4]],
      type: Array,
      required: false
    }
  },
  methods: {
    click(index: number) {
      this.$emit('click', index);
    },
    remove(photo) {
      this.$emit('remove', photo);
    }
  },
  computed:{
    navigationNext: function() { return ` <img src="/icons/arrow-right.svg" />` },
    navigationPrev: function() { return ` <img src="/icons/arrow-left.svg" />` },
  }
})
</script>

<style lang="scss">
.VueCarousel-navigation {
  position: relative;

  button:nth-child(1) {
    cursor: pointer;
    right: 38px;
    left: auto;
    top: -140px;

    &:focus{
      outline:none
    }

    &:after {
      content: '';
      width: 1px;
      height: 11px;
      border-radius: 0.5px;
      background-color: #b6beca;
      display: block;
      position: absolute;
      top: 17px;
      left: 24px;
    }
  }

  button:nth-child(2){
    cursor: pointer;
    right: 50px;
    top: -140px;

    &:focus{
      outline:none
    }
  }
}

</style>
