<template>
  <Modal modal-class="payment-modal" v-if="modal.show" @close="cancel">
    <template slot="header">Payment</template>
    <template slot="body">
      <div class="payment">
        <div class="wallet">
          <p class="wallet__title">Choose your wallet</p>
          <div class="wallet__row">
            <div class="wallet__block">
              <input type="radio" checked="checked" id="wallet-radio-paypal" name="wallet" value="paypal" class="wallet__radio">
              <label for="wallet-radio-paypal">
                <inline-svg src="/icons/ppcom.svg"/>
              </label>
            </div>
          </div>
        </div>
        <form class="withdrawal" @submit.prevent="submit">
          <div class="withdrawal__row">
            <div class="withdrawal__block"><p class="withdrawal__title">Your balance</p>
              <p class="withdrawal__subtitle">{{ balance !== null ? balance : '&nbsp;' }}</p>
            </div>
            <div class="withdrawal__block"><p class="withdrawal__title">Talkens amount</p>
              <input type="number" v-model="talkens" placeholder="0" class="withdrawal__input">
            </div>
          </div>
          <div class="withdrawal__row">
            <div class="withdrawal__button">
              <button type="submit" :disabled="disabled" class="btn">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import Rating from "~/components/ui/user/rating.vue"
import modal from "~/components/ui/modal.vue"
import * as core from "~/types/core"

export default Vue.extend({
  components: {modal, Rating},
  props: {
    modal: {
      required: true,
      type: Object as PropType<{ show: boolean }>,
    }
  },
  data() {
    return {
      talkens: null as number | null,
      balance: null as number | null
    }
  },
  computed: {
    disabled(): boolean {
      return !this.talkens;
    },
  },
  mounted() {
    const ident: core.IUser | null = this.$store.getters['user/local'];
    this.balance = Number(ident?.talkens ?? 0) + Number(ident?.bonuses ?? 0);
  },
  methods: {
    cancel() {
      this.$emit('cancel');
      this.modal.show = false;
    },
    submit() {
      const token = this.$store.state.user.token;
      window.location.href = this.$conf.api.host + `/paypal/order/${this.talkens}?access-token=${token}`;
    }
  }
})
</script>

<style lang="scss">

.payment-modal {

  .modal-body {
    margin-top: 0;
  }

  .payment {
    padding: 20px;
  }

  .withdrawal {
    margin-bottom: 5px;
  }

  .wallet__title {
    text-align: center;
    margin-bottom: 30px;
  }

  .wallet__block {
    margin: 0 auto;
  }

  .withdrawal__input {
    width: 90px;
  }

  .withdrawal__button {
    margin: 40px auto 0;
  }
}
</style>
