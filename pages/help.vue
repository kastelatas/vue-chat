<template>
  <div class="help-page">
    <div class="help-page__content">
      <h1 class="help-page__title">Help Center</h1>
      <div v-if="showText">
        <p class="help-page__text">Welcome you to HugWord support service.</p>
        <br/>
        <p class="help-page__text">
          We will do our best to help you to solve your problem. We suggest you to read the <a href="/faq">FAQ</a> page
          first, which
          contains answers to the most frequently asked questions of our users. If you do not find the answer to
          your question there, you can create a ticket and our experts will try to help you.
        </p>
        <br/>
        <p class="help-page__text"> Did <a href="/faq">FAQ</a> page solve your problem?</p>
        <div class="help-page__button-block">
          <button class="btn btn_block btn-outline-primary" type="button" @click="handleOpenForm">
            No
          </button>
          <button class="btn btn_block" type="button" @click="handleOpenGreatText">
            Yes
          </button>
        </div>
      </div>

      <div v-if="showForm">
        <h2 class="help-page__sub-title">
          Describe the problem and our support team will help you to solve it.
        </h2>
        <HelpForm/>
      </div>

      <div v-if="showGreatText">
        <p class="help-page__text"> Great!</p>
        <br/>
        <p class="help-page__text">
          We are glad that your problem is solved. We hope that HugWord service will continue to bring you pleasure.
        </p>
        <br/>
        <p class="help-page__text">Have a good day!</p>
        <br/>
        <router-link tag="button" class="btn btn_block help-page__btn-great" to="/"> Back to Hug Search</router-link>

      </div>

    </div>
  </div>
</template>


<script>
import HelpForm from '../components/forms/form'

export default {
  data() {
    return {
    showForm:false,
    showText:true,
    showGreatText:false
  }
},
components:{HelpForm},
  methods:{
    handleOpenForm() {
      this.showForm = !this.showForm
      this.showText = !this.showText
    },
    handleOpenGreatText() {
      this.showGreatText = !this.showGreatText
      this.showText = !this.showText
    }
  },

}


</script>
