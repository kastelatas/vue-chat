<template>
  <Modal v-if="model.show" @close="cancel">
    <template slot="header">
      <h3 class="modal__title">Are you shure?</h3>
      <h3 class="modal__notice"></h3>
    </template>
    <template slot="body">
      <div class="select-group">
      </div>
      <div class="modal__actions">
        <button class="btn" @click="done">Yes</button>
        <button class="btn" @click="cancel">No</button>
      </div>
    </template>

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
      required: true,
      type: Object as PropType<IModel>,
    }
  },
  methods: {
    done() {
      this.$emit('done');
      this.model.show = false;
    },

    cancel() {
      this.$emit('cancel');
      this.model.show = false;
    }
  }
})
</script>
