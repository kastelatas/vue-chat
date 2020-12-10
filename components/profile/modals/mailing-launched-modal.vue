<template>
  <Modal v-if="model.show">
    <template slot="body">
      <h3 class="modal__title">Mailing was launched!</h3>
      <div class="modal__actions">
        <button class="btn" @click="done">OK</button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from "vue"
import modal from "~/components/ui/modal.vue"

export default Vue.extend({
  components: {modal},
  props: {
    model: {
      required: true,
      type: Object as PropType<{ show: boolean }>,
    }
  },
  methods: {
    done() {
      this.model.show = false;
    },
  }
})
</script>
