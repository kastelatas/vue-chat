<template>
  <Modal v-if="modal.show" @close="close">
    <template slot="header">
      <template>Insufficient funds</template>
    </template>
    <form slot="body" @submit.prevent="submit">
      <div class="modal-spret">
        <p class="modal__text">Message wasn't sent! You dont have enough talkens!</p>
        <div class="modal__icon">
          <inline-svg src="/icons/warning-icon.svg"></inline-svg>
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
import Modal from '~/components/ui/modal.vue'

export default Vue.extend({
  components: {Modal},
  props: {
    modal: {
      type: Object as PropType<{ show: boolean }>,
      required: true,
    }
  },
  methods: {
    submit() {
      this.modal.show = false;
      this.$glob.modals.payment.show = true;
    },

    close() {
      this.modal.show = false;
    }
  }
})
</script>
