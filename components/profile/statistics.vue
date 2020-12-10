<template>
<div class="full-statistics">
  <div class="profile-statistics__line">
    <inline-svg src="/icons/chats-started.svg"/>
    <span class="profile-statistics__linetitle">New Chats Started</span>
  </div>
  <div class="bill-table">
    <span class="bill-table__item">Previous week:</span>
    <strong class="bill-table__item-count" v-if="stats.chats">{{ stats.chats.week }}</strong>
    <span class="bill-table__item">Yesterday:</span>
    <strong class="bill-table__item-count bill-table__item-count_low" v-if="stats.chats">{{
        stats.chats.yesterday
      }}</strong>
    <span class="bill-table__item">Today::</span>
    <strong class="bill-table__item-count bill-table__item-count_high" v-if="stats.chats">{{
        stats.chats.today
      }}</strong>
  </div>
  <div class="profile-statistics__line">
    <inline-svg src="/icons/views-icon.svg"/>
    <span class="profile-statistics__linetitle">Your account views</span>
    <i class="profile-statistics__tooltip" data-tooltip="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.">?</i>
  </div>
  <div class="profile-statistics__line">
    <inline-svg src="/icons/billing-stat.svg"/>
    <span class="profile-statistics__linetitle">Talkens earned</span>
  </div>
  <div class="bill-table">
    <span class="bill-table__item">Previous week:</span>
    <strong class="bill-table__item-count" v-if="stats.talkens">{{ stats.chats.week }}</strong>
    <span class="bill-table__item">Yesterday:</span>
    <strong class="bill-table__item-count" v-if="stats.talkens">{{ stats.chats.yesterday }}</strong>
    <span class="bill-table__item">Today:</span>
    <strong class="bill-table__item-count" v-if="stats.talkens">{{ stats.chats.today }}</strong>
  </div>
</div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
    stats: {
      type: Object as PropType<any>,
      required: true
    }
  }
})
</script>
