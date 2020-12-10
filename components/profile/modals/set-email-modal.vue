<template>
  <Modal v-if="model.show" @close="model.show = false">
    <template slot="header">MESSAGE SENT</template>
    <form slot="body" @submit.prevent="ok">
      <div class="modal-spret">
        <p class="modal__text">Check your email for message and follow the confirmation link.</p>
        <div class="modal__icon">
          <inline-svg src="/icons/main-letter.svg" height="39" width="41"/>
        </div>
        <div class="modal__actions">
          <button type="submit" class="btn">Ok</button>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import modal from '~/components/ui/modal.vue'

interface IModel {
  show: boolean
}

export default Vue.extend({
  components: {modal},
  props: {
    model: {
      type: Object as PropType<IModel>,
      required: true,
    }
  },
  methods: {
    ok() {
      this.model.show = false;
    }
  }
})
</script>
