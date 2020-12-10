<template>
  <div>
    <SetEmailConfirmModal :model="modal"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import find from 'lodash/find'
import SetEmailConfirmModal, {IModel as IModal} from "~/components/user/modals/set-email-confirm-modal.vue"

interface IData {
  modal: IModal
}

export default Vue.extend({
  components: {SetEmailConfirmModal},
  data(): IData {
    return {
      modal: {show: false, sent: false, error: ''}
    }
  },
  watch: {
    'modal.show'(v) {
      !v && this.$router.push(this.modal.sent ? '/profile' : '/');
    }
  },
  async fetch() {
    this.$store.dispatch('user/logout');
    this.$store.dispatch('user/setEmailConfirm', {
      email: this.$route.query.email,
      token: this.$route.query.token,
    }).then(() => {
        this.modal.sent = true;
        this.modal.show = true;
      }, (errors) => {
        this.modal.error = find(errors);
        this.modal.show = true;
      }
    );
  },
  fetchOnServer: true
})
</script>
