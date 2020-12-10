<template>
  <div class="about-page">

    <h1 class="about-page__title">{{about.top_title}}</h1>
    <p class="about-page__subtitle" v-html="about.top_description">{{about.top_description}}</p>
    <div class="about-page__row-cont">
      <div class="about-page__img-row" >
        <div  class="about-page__img-block" v-for="photo  in about.photos && about.photos">
          <img class="about-page__img" alt="about_img" :src="photo.image.path | media" >
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="about-page__row">
        <div class="statistics-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 39" height="39" width="41">
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
                <rect class="cls-5" x="7" y="17" width="27" height="3" rx="1.5" ry="1.5"></rect>
                <rect class="cls-5" x="14" y="23" width="13" height="3" rx="1.5" ry="1.5"></rect>
                <circle class="cls-5" cx="6" cy="11" r="2"></circle>
                <circle class="cls-5" cx="12" cy="11" r="2"></circle>
                <circle class="cls-5" cx="18" cy="11" r="2"></circle>
              </g>
            </g>
          </svg>
          <span class="counter">20,000</span><span class="statistic-title">Chats online</span></div>
        <div class="statistics-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 39" height="39" width="41">
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
                <rect class="cls-5" x="7" y="17" width="27" height="3" rx="1.5" ry="1.5"></rect>
                <rect class="cls-5" x="14" y="23" width="13" height="3" rx="1.5" ry="1.5"></rect>
                <circle class="cls-5" cx="6" cy="11" r="2"></circle>
                <circle class="cls-5" cx="12" cy="11" r="2"></circle>
                <circle class="cls-5" cx="18" cy="11" r="2"></circle>
              </g>
            </g>
          </svg>
          <span class="counter">20,000</span><span class="statistic-title">Chats online</span></div>
        <div class="statistics-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 39" height="39" width="41">
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
                <rect class="cls-5" x="7" y="17" width="27" height="3" rx="1.5" ry="1.5"></rect>
                <rect class="cls-5" x="14" y="23" width="13" height="3" rx="1.5" ry="1.5"></rect>
                <circle class="cls-5" cx="6" cy="11" r="2"></circle>
                <circle class="cls-5" cx="12" cy="11" r="2"></circle>
                <circle class="cls-5" cx="18" cy="11" r="2"></circle>
              </g>
            </g>
          </svg>
          <span class="counter">20,000</span><span class="statistic-title">Chats online</span></div>
        <div class="statistics-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 39" height="39" width="41">
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
                <rect class="cls-5" x="7" y="17" width="27" height="3" rx="1.5" ry="1.5"></rect>
                <rect class="cls-5" x="14" y="23" width="13" height="3" rx="1.5" ry="1.5"></rect>
                <circle class="cls-5" cx="6" cy="11" r="2"></circle>
                <circle class="cls-5" cx="12" cy="11" r="2"></circle>
                <circle class="cls-5" cx="18" cy="11" r="2"></circle>
              </g>
            </g>
          </svg>
          <span class="counter">20,000</span><span class="statistic-title">Chats online</span></div>
      </div>
    </div>
    <div class="about-page__descr">
      <div class="about-page__row">
        <div class="about-page__col"><p class="about-page__descr_subtitle">{{about.center_note}}</p>
          <h2 class="about-page__descr_title">{{about.center_title}}</h2>
          <p class="about-page__descr_text" v-html="about.center_description">{{about.center_description}}</p>
        </div>
        <div class="about-page__col">
          <div class="about-page__imgs">
            <img v-if="about.photo1" class="about-page__big" :src="about.photo1.path | media"  alt="about_img">
            <img v-if="about.photo2" class="about-page__small" :src="about.photo2.path | media"   alt="about_img">
          </div>
        </div>
      </div>
    </div>
    <div class="about-page__team">
      <p class="about-page__team_subtitle">{{about.bottom_title}}</p>
      <h2 class="about-page__team_title">{{about.bottom_title}}</h2>
      <p class="about-page__team_text" v-html="about.bottom_description">{{about.bottom_description}}</p>
      <div class="about-page__img-row">

      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      about: []
    }
  },
  async fetch() {
    await this.$store.dispatch('getAboutUs')
    this.about = await this.$store.state.about

  },
  fetchOnServer: true
})
</script>
