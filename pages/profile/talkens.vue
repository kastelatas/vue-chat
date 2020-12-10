<template>
  <div>
    <div class="profile-billing">
      <div class="profile-billing__lines-row">
        <div class="profile-billing__line">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 39" width="39px" height="39px">
            <defs>
              <style>.cls-1 {
                fill: #3faaff;
              }

              .cls-2 {
                fill: #d8e1f0;
              }

              .cls-3 {
                fill: #fff;
              }

              .cls-4 {
                fill: #f2f6fc;
              }

              .cls-5 {
                fill: #ff3fca;
              }
              </style>
            </defs>
            <g>
              <g>
                <circle class="cls-1" cx="20.5" cy="19.5" r="19.5"></circle>
                <rect class="cls-2" y="7" width="41" height="28" rx="4" ry="4"></rect>
                <rect class="cls-3" y="5" width="41" height="28" rx="4" ry="4"></rect>
                <rect class="cls-4" y="6" width="41" height="28" rx="4" ry="4"></rect>
                <rect class="cls-2" x="26" y="16" width="17" height="10" rx="5" ry="5"></rect>
                <rect class="cls-3" x="26" y="14" width="17" height="10" rx="5" ry="5"></rect>
                <rect class="cls-4" x="26" y="15" width="17" height="10" rx="5" ry="5"></rect>
                <circle class="cls-5" cx="31" cy="20" r="2"></circle>
              </g>
            </g>
          </svg>
          <span class="profile-billing__message">Talkens balance:</span>
          <div style="display: flex;"><span class="profile-billing__count">{{ balance }}</span>
            <span class="btn btn_success payment-btn" @click="submit">
              <span>Recharge</span>
            </span>
          </div>
        </div>
      </div>
      <div class="profile-billing__row">
        <div class="profile-billing__content"><h3 class="profile-billing__subtitle">Lorem ipsum dolor.</h3>
          <p class="profile-billing__text">orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
            ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
            quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p></div>
        <video width="920" controls="">
          <source src="https://www.youtube.com/watch?v=oznr-1-poSU" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  data() {
    return {
      balance: null as number | null,
    }
  },

  methods: {
    submit() {
      this.$glob.modals.payment.show = true;
    }
  },

  async fetch() {
    this.balance = Number(this.$store.state.user.identity.talkens) + Number(this.$store.state.user.identity.bonuses);
  },

  fetchOnServer: true
})
</script>

<style lang="scss">

.payment-btn {
  cursor: pointer;
}

</style>
