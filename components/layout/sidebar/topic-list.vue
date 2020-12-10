<template>
  <div>
    <aside class="sidebar-left">
      <aside class="sidebar-left__header"><h3>Popular topics</h3>
        <Sorting :options="['relevance', 'name']" :model="sort"/>
      </aside>
      <aside class="sidebar-left__content">
        <div class="sidebar-left__ltr">
          <div v-for="item in topics" :key="item.id"
            class="category-card" :class="{'category-card__active': item === current }">
            <router-link :to="item === current ? '/' : '/topic/' + item.slug">
              <video @mouseover="play" @mouseleave="stop" playsinline>
                <source
                  v-for="(source, type) in item.video.sources"
                  :src="source | media"
                  :type="type">
              </video>
              <div class="category-card__overlay">
                <div class="category-card__title">{{ item.title }}</div>
                <div class="category-card__text"> Ambassadors: {{ item.ambassadorsCount }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </aside>
    </aside>

    <aside class="sidebar-left-mobile"
      :class="{'sidebar-left-mobile-open' :openSidebar}"
      v-click-outside="hide"
    >
      <div class="sidebar-left-mobile__category-list">
        <aside class="sidebar-left__header">
          <Sorting :options="['relevance', 'name']" :model="sort"/>
        </aside>
        <div v-for="item in topics" :key="item.id" class="category-card"
          :class="{'category-card__active': item === current }">
          <router-link :to="'/topic/' + item.slug">
            <video>
              <source
                v-for="(source, type) in item.video.sources"
                :src="source | media"
                :type="type">
            </video>
            <div class="category-card__overlay">
              <div class="category-card__title">{{ item.title }}</div>
              <div class="category-card__text"> Ambassadors: {{ item.ambassadorsCount }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="sidebar-left-mobile__open" @click="setOpenSidebar">
        <span>
          <img src="/icons/arrow-right.svg">
        </span>
      </div>
    </aside>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import Sorting, {ISort} from '~/components/layout/sorting.vue'
import * as core from "~/types/core";
import {ITopic} from "~/types/core";

interface IData {
  openSidebar: boolean,
  sort: ISort
}

export default Vue.extend({
  components: {Sorting},
  props: ['options'],
  data: (): IData => {
    return {
      openSidebar: false,
      sort: {
        attribute: 'relevance',
        reverse: false,
      }
    }
  },
  computed: {
    current(): core.ITopic | null {
      for (const topic of this.$store.state.topics) {
        if (topic.slug == this.$route.params.topic) {
          return topic
        }
      }
      return null
    },
    topics(): core.ITopic[] {
      const topics = [...this.$store.state.topics]
      const attribute = this.sort.attribute == 'name' ? 'title' : 'ambassadorsCount'

      topics.sort((a, b) => {
        if (a[attribute] > b[attribute]) {
          return this.sort.reverse ? 1 : -1
        }
        if (a[attribute] < b[attribute]) {
          return this.sort.reverse ? -1 : 1
        }
        return 0
      })

      return topics
    }
  },
  methods: {
    setOpenSidebar() {
      this.openSidebar = !this.openSidebar
    },
    hide() {
      this.openSidebar = false
    },
    play({target}) {
      target.play();
      target.setAttribute('muted', 'muted');
      target.setAttribute('loop', 'true');
    },
    stop({target}) {
      target.pause();
      target.setAttribute('muted', 'false');
    }
  },
  async fetch() {
    await this.$store.dispatch('topics');
  },
  fetchOnServer: true
})
</script>

<style>
.category-card a {
  color: inherit;
}
</style>
