<template>
  <Modal v-if="model.show" @close="model.show = false">
    <template slot="header">
      <h3 class="modal__title">Topics Adding</h3>
      <h3 class="modal__notice">( {{ topics.length }} of 5 )</h3>
    </template>
    <template slot="body">
      <div class="select-group ">
        <div class="input-group input-group_block">
          <vue-select
            :options="options"
            v-model="selected"
            placeholder="Choose a topic"
            :selectable="() => topics.length < 5"
            @search:focus="openOption"
          />
        </div>
      </div>
      <div class="modal__actions">
        <button :disabled="!selected" class="btn" @click="submit">Done</button>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss">


@media(max-width: 768px) {
  .vs__dropdown-menu {
    max-height: 150px !important;
  }

}

.vs__dropdown-menu {
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 14px 14px transparent;
    border: solid 4px transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 14px 14px #e7ebf1;
    border: solid 4px transparent;
    border-radius: 24px;
  }


}
</style>

<script lang="ts">
import Vue, {PropType} from "vue"
import * as core from "~/types/core"
import {IProfileTopic, ITopic} from "~/types/core"
import find from "lodash/find"

interface IModel {
  show: boolean
}

interface IOption {
  value: number
  label: string
}

export default Vue.extend({
  props: {
    model: {
      type: Object as PropType<IModel>,
      required: false
    },
    topics: {
      type: Array as PropType<core.IProfileTopic[]>,
      required: false
    }
  },
  data() {
    return {
      selected: null as IOption | null,
      topicCount: 5,
      Height: 120 as Number
    };
  },
  mounted() {

  },
  computed: {
    options(): IOption[] {
      const options = this.dict.map((item) => ({value: item.id, label: item.title}));
      return options.filter((item) => !this.exists(item.value));
    },
    dict(): ITopic[] {
      return this.$store.state.topics;
    }
  },
  methods: {
    openOption(){
     setTimeout(()=>{
       document.querySelector<HTMLElement>('.vs__dropdown-menu')!.style.setProperty('vs-dropdown-max-height', 200 + 'px')
     }, 0)
    },
    exists(id: number): boolean {
      for (const topic of this.topics) {
        if (topic.topic_id === id) {
          return true;
        }
      }
      return false;
    },

    submit() {
      const id = this.selected?.value!;
      const topic: ITopic = find(this.dict, ['id', id])!;
      const item: IProfileTopic = {topic_id: id, topic};
      this.topics.push(item);
      this.selected = null;
      this.model.show = false;
    }
  },
  async fetch() {
    await this.$store.dispatch('user/init');
  },
  fetchOnServer: true
})
</script>
