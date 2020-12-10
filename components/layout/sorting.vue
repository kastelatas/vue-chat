<template>
  <div class="sorting" v-click-outside="close">
    <span class="sorting__text">Sort by:</span>
    <span class="sorting__attribute" @click="toggle">{{ model.attribute }}</span>
    <button type="button" class="btn-icon" :class="model.reverse ? '' : 'desc'" @click="order">
      <svg fill="#b2bcc5" height="7.125" viewBox="0 0 11.312 7.125" width="11.312" xmlns="http://www.w3.org/2000/svg">
        <path d="M383.875,34.548l-5.7,5.609,1.4,1.426,5.7-5.609Zm-8.485-.072-1.426,1.4,5.608,5.7,1.427-1.4Z" transform="translate(-373.969 -34.469)"></path>
      </svg>
    </button>
    <ul v-show="opened" class="sorting__menu">
      <li v-for="item in options" @click="select(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

interface IData {
  opened: boolean
}

export interface ISort {
  attribute: string,
  reverse: boolean
}

export default Vue.extend({
  props: {
    options: {
      type: Array as PropType<string[]>,
      required: true
    },
    model: {
      type: Object as PropType<ISort>,
      required: true
    },
  },
  data(): IData {
    return {
      opened: false,
    }
  },
  methods: {
    toggle() {
      this.opened = !this.opened
    },
    close() {
      this.opened = false
    },
    select(option) {
      this.model.attribute = option;
      this.close()
    },
    order() {
      this.model.reverse = !this.model.reverse;
      this.close()
    }
  },
  created() {
    if (!this.model.attribute && this.options.length) {
      this.model.attribute = this.options[0]
    }
  },
})
</script>
