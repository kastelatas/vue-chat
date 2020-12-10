<template>
  <Modal v-if="$glob.modals.login.show" @close="close">
    <template slot="header">SIGN IN</template>

   <template slot="body" style="width: 100%;">
     <form slot="body" @submit.prevent="submit">
       <div class="input-group">
        <span class="input-group__icon">
          <inline-svg src="/icons/main-text.svg" width="41" height="28"/>
        </span>
         <div class="input-group__block">
           <input type="email" placeholder="Enter your e-mail" v-model="form.data.login">
           <div v-if="form.errors.login" class="input-group__invalid">{{ form.errors.login }}</div>
         </div>
       </div>
       <div class="input-group input-group_block">
        <span class="input-group__icon">
          <inline-svg src="/icons/main-pass.svg" width="41" height="28"/>
        </span>
         <div class="input-group__block">
           <input type="password" required placeholder="Enter your password" v-model="form.data.password">
           <div v-if="form.errors.password" class="input-group__invalid">{{ form.errors.password }}</div>
         </div>
       </div>
       <div class="modal__actions ">
         <button type="submit" class="btn">Done</button>

         <span class="links">
        <span @click="register">Registered</span>
        <span @click="forgot">Forgot your password?</span>
      </span>
       </div>
     </form>
   </template>

    <template slot="footer">
      <span>Or you can sign in with your social account:</span>
      <a class="facebook auth-link" :href="$conf.api.host + '/user/auth?authclient=facebook'" title="Facebook"
        data-popup-width="860" data-popup-height="480">
        <span class="input-group__icon">
          <inline-svg src="/icons/socials/facebook.svg" width="20" height="20"/>
        </span>
      </a>
      <a class="google auth-link" :href="$conf.api.host + '/user/auth?authclient=google'" title="Google">
        <inline-svg src="/icons/socials/google.svg" width="20" height="20"/>
      </a>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import modal from '~/components/ui/modal.vue'
import * as core from '~/types/core'
import {IAuth} from '~/types/core'

interface IData {
  form: {
    data: {
      login: string
      password: string
    }
    errors: core.TSMap
  },
  auth: Object
}

interface IModel {
  show: boolean,

  done(): void
}

export default Vue.extend({
  components: {modal},
  data(): IData {
    return {
      form: {
        data: {
          login: '',
          password: ''
        },
        errors: {
          login: '',
          password: ''
        }
      },
      auth: {}
    }
  },
  methods: {
    forgot() {
      this.$glob.modals.login.show = false;
      this.$glob.modals.forgot.show = true;
    },
    register() {
      this.$glob.modals.verification.show = true
    },
    submit() {
      this.$store.dispatch('user/login', this.form.data).then((res: IAuth) => {
          this.$glob.modals.login.show = false;
          if (this.$glob.modals.login.done) {
            this.$glob.modals.login.done();
          } else {
            if (res.user?.type == core.EUserType.Ambassador) {
              this.$router.push('/dashboard');
            } else {
              this.$router.push('/');
            }
          }

          this.$glob.modals.login.done = () => null
          this.$glob.modals.login.show = false
          this.$glob.modals.login.show = false;
        }, (errors) => {
          this.form.errors = errors;
        }
      );
    },
    close() {
      this.$glob.modals.login.show = false;
      this.$glob.modals.login.done = () => null
    }
  },

})
</script>


<style  lang="scss">
.modal-body {
  width: 100%;
}
</style>
