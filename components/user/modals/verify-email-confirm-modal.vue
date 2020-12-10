<template>
  <Modal v-if="model.show">
    <template slot="header">
      <template v-if="model.error">Error</template>
      <template v-else-if="model.sent">Now you are verified</template>
    </template>
    <form slot="body" @submit.prevent="close">
      <div class="modal-spret">
        <p class="modal__text">
          <template v-if="model.error">{{ model.error }}</template>
          <template v-else-if="model.sent">
            You received a gift of 10 talkens, as a thank you!
            You can spend them for chatting (1 talking = 1 massage).
          </template>
        </p>
        <div class="modal__icon" style="height: 41px">
          <inline-svg src="/icons/main-letter.svg" height="39" width="41"/>
        </div>
        <div class="modal__actions">
          <button type="submit" class="btn">Thanks</button>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export interface IModel {
  show: boolean,
  sent: boolean,
  error: string
}

export default Vue.extend({
  props: {
    model: {
      type: Object as PropType<IModel>,
      required: true,
    }
  },
  methods: {
    close() {
      this.model.show = false;
    }
  }
})
</script>
