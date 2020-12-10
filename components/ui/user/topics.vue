<template>
  <div>

    <div class="tags-block" v-if="!edit">
      <router-link
        class="tag"
        active-class="active"
        v-for="item in topics"
        :key="item.topic_id"
        :to="'/topic/' + item.topic.slug">
        <span>{{ item.topic.title }}</span>
        <button v-if="edit" @click.prevent="remove(item)" class="btn-icon" title="Remove">
          <inline-svg src="/icons/close.svg"/>
        </button>
      </router-link>
    </div>
    <div class="tags-block" v-else>
      <span
        class="tag"
        v-for="item in topics"
        :key="item.topic_id">
        <span>{{ item.topic.title }}</span>
        <button v-if="edit" @click.prevent="remove(item)" class="btn-icon" title="Remove">
          <inline-svg src="/icons/close.svg"/>
        </button>
      </span>
    </div>
    <button v-if="edit" class="btn-icon btn-icon_type_add-ring" @click="modal.show = true">
      <span class="btn-icon__content">
        <inline-svg src="/icons/plus-grey.svg"/>
      </span>
    </button>
    <TopicAddModal :model="modal" :topics="topics"  />
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import * as core from '~/types/core'
import TopicAddModal from "~/components/ui/user/topics/topic-add-modal.vue"

export default Vue.extend({
  components: {
    TopicAddModal
  },
  props: {
    edit: {type: Boolean},
    topics: {
      required: true,
      type: Array as PropType<core.IProfileTopic[]>,
    },
  },
  data() {
    return {
      modal: {show: false}
    }
  },
  methods: {
    remove(topic) {
      for (const i in this.topics) {
        if (this.topics[i].topic_id == topic.topic_id) {
          this.topics.splice(Number(i), 1);
        }
      }
    }
  }
})
</script>

<style>
.tags-block .btn-icon {
  margin-left: 5px;
  margin-right: 2px;
}
</style>
