<template>
  <Modal v-if="$glob.modals.verification.show" @close="$glob.modals.verification.show = false">
    <template slot="header">
      <template v-if="form.sent">MESSAGE SENT</template>
      <template v-else>VERIFICATION</template>
    </template>
    <form slot="body" @submit.prevent="submit">
      <div class="modal-spret">
        <template v-if="form.sent">
          <p class="modal__text">Check your email for message and follow the confirmation link.</p>
          <div class="modal__icon">
            <inline-svg src="/icons/main-letter.svg" height="39" width="41" style="width: 39px; height: 41px;"/>
          </div>
        </template>
        <template v-else>
          <p class="modal__text">
            To continue to communicate you need to get verified, <br>
            please enter your e-mail address.
          </p>
          <div class="input-group">
            <span class="input-group__icon">
              <inline-svg src="/icons/main-letter.svg" height="39" width="41"/>
            </span>
            <div class="input-group__block">
              <input name="email" type="email" required placeholder="Enter your e-mail" v-model="form.data.email">
              <div v-if="form.errors.email" class="input-group__invalid">{{ form.errors.email }}</div>
            </div>
          </div>
        </template>
        <div class="modal__actions">
          <button type="submit" class="btn" >Ok</button>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import Modal from '~/components/ui/modal.vue'

interface IData {
  form: {
    sent: boolean,
    data: { email: string }
    errors: {}
  }
}

export default Vue.extend({
  components: {Modal},
  data(): IData {
    return {
      form: {
        sent: false,
        data: {
          email: '',
        },
        errors: {
          email: '',
        }
      }
    }
  },
  props: {
    sent: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Object as PropType<{ show: boolean }>,
      required: true,
    }
  },
  created() {
    this.form.sent = this.sent;
  },
  methods: {
    submit() {
      if (this.form.sent) {
        this.modal.show = false;
      } else {
        this.$store.dispatch('user/verifyEmail', this.form.data).then(() => {
            this.form.sent = true;
            this.$glob.modals.login.show = false
          }, (errors) => {
            this.form.errors = errors;
          }
        );
      }
    },
    closeSent(){

    },
    close() {
      this.modal.show = false;
    }
  }
})
</script>
