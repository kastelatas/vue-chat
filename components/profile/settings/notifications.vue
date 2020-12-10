@cha<template>
  <div class="profile-settings__grid">
    <div v-for="(value, key) in this.items" class="switch-container">
      <inline-svg v-if="key === main" :src="icon"/>
      <span class="switch-container__text">{{ titles[key] }}</span>
      <label class="switch">
        <input type="checkbox" v-model="settings.data[key]" @change="change(key, settings.data[key])">
        <span class="switch-slider round"></span>
        <span v-if="settings.data[key]" class="switch__text switch__text_right">On</span>
        <span v-else class="switch__text">Off</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {ISettings} from "~/pages/profile.vue";

interface IItems {
  [key: string]: boolean,
}

export default Vue.extend({
  props: {
    icon: {type: String, required: true},
    prefix: {type: String, required: true},
    titles: {type: Object, required: true},
    settings: {type: Object as PropType<ISettings>, required: true},
  },

  computed: {
    main(): string {
      return this.prefix + '_all';
    },
    items(): IItems {
      const items = {};
      for (const i in this.settings.data) {
        if (i.startsWith(this.prefix + '_')) {
          items[i] = this.settings.data[i];
        }
      }
      return items;
    }
  },

  methods: {
    change(key: string, value: boolean) {
      if (key == this.main) {
        for (const i in this.items) {
          this.settings.data[i] = value;
        }
      } else {
        let state = false;
        for (const i in this.items) {
          if (i != this.main) {
            if (this.items[i]) {
              state = true;
            }
          }
        }
        this.settings.data[this.main] = state;
      }
    }
  }
})
</script>

<style>
.profile-settings__grid .switch-container svg {
  width: 41px;
  height: 39px;
}
</style>
