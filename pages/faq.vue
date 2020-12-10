<template>
  <div class="faq-page">
    <h1 class="faq-page__title">FAQ</h1>
    <div v-for="(faq) in allFaq" class="faq" :class="{open: currFaq === faq}" @click="currFaq = faq">
      <div class="question">{{ faq.title }}</div>
      <div class="answer">{{ faq.content }}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      currFaq: {},
      allFaq: [],
    }
  },
  async fetch() {
    await this.$store.dispatch('getFaqsQuestions');
    const faq = this.$store.state.faq
    if (this.currFaq && faq.length) {
      this.currFaq = faq[0];
    }
    this.allFaq = faq
  },
  fetchOnServer: true
})
</script>

<style>

.faq {
  display: block;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  border-radius: 10px;
  color: #768594;
  cursor: pointer;
  font-size: 20px;
  text-align: left;
  border: none;
  margin-bottom: 10px;
}

.faq .question {
  position: relative;
  border-radius: 10px;
  box-sizing: border-box;
  color: #3c3c3c;
  padding: 20px 28px;
  font-size: 20px;
  transition: all 0.4s linear;
}

.faq .question::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%) rotate(0deg);
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  transition: all 0.2s linear;
}

.faq.open .question {
  background: linear-gradient(90deg, #fc4cc3, #ffb39d);
  color: #fff;
  -webkit-animation: fadein .35s ease-in;
  animation: fadein .35s ease-in;

}

.faq.open .question::after {
  transform: translateY(-50%) rotate(90deg);
}

.faq .answer {
  color: #3c3c3c;
  font-size: 18px;
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  transition: all 0.4s ease-out;
}

.faq.open .answer {
  opacity: 1;
  padding: 20px;
  max-height: 1000px;
}
</style>
