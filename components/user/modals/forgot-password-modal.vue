<template>
  <Modal v-if="$glob.modals.forgot.show" @close="close">
    <template slot="header">
      <template v-if="error">Error</template>
      <template v-else-if="sent">Done</template>
      <template v-else>Reset Password</template>
    </template>
    <form slot="body" @submit.prevent="submit">
      <div class="modal-spret">
        <p v-if="!sent" class="modal__text">Please enter your e-mail address.</p>
        <p v-else class="modal__text">Check your email for message and follow the confirmation link.</p>
        <div v-if="!sent" class="input-group">
          <span class="input-group__icon">
            <inline-svg src="/icons/main-letter.svg"/>
          </span>
          <div class="input-group__block">
            <input type="email" placeholder="Enter your e-mail" v-model="email">
            <div v-if="error" class="input-group__invalid">{{ error }}</div>
          </div>
        </div>
        <div v-if="!sent" class="modal__actions">
          <button type="submit" class="btn">Send</button>
        </div>
        <div v-else class="modal__actions">
          <button @click="close" type="button" class="btn">Thanks</button>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
    modal: {
      type: Object as PropType<{ show: boolean }>,
      required: true,
    }
  },
  data() {
    return {
      sent: false,
      email: '',
      error: ''
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('user/resetPassword', {
        email: this.email,
      }).then(() => {
          this.error = '';
          this.sent = true;
        }, errors => {
          this.error = errors.email;
        }
      );
    },
    close() {
      this.$glob.modals.login.show = true;
      this.$glob.modals.forgot.show = false;
    }
  }
})
</script>
