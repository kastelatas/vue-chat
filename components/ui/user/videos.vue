<template>
  <carousel :per-page="3">
    <slide v-for="item in videos" :key="item.id">
      <div class="video video-fit">
        <div class="video-container">
          <video @play="onPlay" @pause="onPause" preload="auto" playsinline :src="item.video.path | media" >
            <source v-for="(source, type) in item.video.sources" :src="source | media" :type="type"/>
          </video>
        </div>
        <button type="button" class="btn-icon btn-icon_type_play" @click="play">
          <span class="btn-icon__content">
            <inline-svg src="/icons/play-button.svg"/>
          </span>
        </button>
        <button type="button" class="btn-icon btn-icon_type_close-photo" @click="remove(item)">
          <span class="btn-icon__content" v-if="edit">
            <inline-svg src="/icons/close.svg"/>
          </span>
        </button>
      </div>
    </slide>
  </carousel>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import * as core from '~/types/core'

export default Vue.extend({
  data() {
    return {
      controls: false,
    }
  },
  props: {
    videos: {
      required: true,
      type: Array as PropType<core.IProfileVideo[]>,
    },
    edit: {
      type: Boolean
    }
  },

  methods: {
    play({target}: { target: HTMLVideoElement }) {
      const video = target.closest( '.video')!.querySelector('video')!;
      video.play();

    },

    onPlay({target}: { target: HTMLVideoElement }) {
      const root = target.closest('.video')!;
      const button = root.querySelector('.btn-icon_type_play') as HTMLButtonElement;
      const nodes = document.querySelectorAll('video') as any;
      target.setAttribute('controls', 'controls');
      for (const node of nodes) {
        if (node !== target) {

          node.pause();
        }
      }

      target.setAttribute('controls', 'controls');
      root.classList.remove("video-fit");
      button.style.display = 'none';
    },

    onPause({target}: { target: HTMLVideoElement }) {
      const root = target.closest('.video')!;
      const button = root.querySelector('.btn-icon_type_play') as HTMLButtonElement;
      target.removeAttribute('controls')
      root.classList.add("video-fit");
      button.style.display = 'block';
    },

    remove(video) {
      this.$emit('remove', video);
    }
  }
})
</script>

<style lang="scss">

.video {
  position: relative;

  .btn-icon_type_close-photo {
    position: absolute;
    top: 0;
    right: 0;
    left: auto;

    svg {
      left: 0;
    }
  }

  .video-container {
    width: 100%;
    height: 100%;

    video {
      width: 100%;
      height: 100%;
    }
  }

  &.video-fit {
    .video-container {
      video {
        object-fit: cover;
      }
    }
  }
}
</style>
