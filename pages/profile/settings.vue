<template>
  <form class="profile-settings" @submit.prevent="submit" autocomplete="off">
    <h3 class="profile__title">Notifications settings</h3>
    <div class="profile-settings">
      <div class="profile-settings__row">
        <Notifications :settings="settings" :titles="titles" prefix="email" icon="/icons/main-letter-rassilka.svg"/>
        <Notifications :settings="settings" :titles="titles" prefix="notification" icon="/icons/main-dot.svg"/>
      </div>
      <div class="profile-settings__action">
        <button class="btn btn_block btn-outline-primary" type="button" @mousedown="reset" :disabled="disabled">Cancel
        </button>
        <button type="submit" class="btn btn_block" :disabled="disabled">Save</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import Notifications from '~/components/profile/settings/notifications.vue'
import {IPersonal, ISettings} from "~/pages/profile.vue";
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import extend from 'lodash/extend'

export default Vue.extend({
  components: {Notifications},
  data() {
    return {
      stored: {
        personal: {} as IPersonal,
        settings: {} as ISettings,
      },
      titles: {
        notification_all: 'Push notifications',
        notification_news: 'Site news',
        notification_comments: 'New comments',
        notification_achievements: 'New achievement',
        notification_reactions: 'New reactions',
        notification_birthdays: 'Users birthdays',
        email_all: 'Email Notifications',
        email_news: 'Site news',
        email_achievements: 'New achievement',
        email_financial_transactions: 'Financial transactions',
        email_monthly_analytics: 'Monthly Analytics',
      }
    }
  },
  props: {
    settings: {type: Object as PropType<ISettings>, required: true},
    personal: {type: Object as PropType<IPersonal>, required: true},
  },
  computed: {
    disabled(): boolean {
      return isEqual(this.stored.settings.data, this.settings.data) &&
        isEqual(this.stored.personal.data, this.personal.data);
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('user/save', {
        setting: this.settings.data,
        profile: {
          name: this.personal.data.name,
          description: this.personal.data.description
        },
      }).then((data) => {
          extend(this.stored.settings.data, data.setting);
          extend(this.settings.data, data.setting);
          this.settings.errors = this.stored.settings.errors;
        }, errors => {
          extend(this.settings.errors, errors.setting ? errors.setting : {});
          extend(this.personal.errors, errors.profile ? errors.profile : {});
        }
      )
    },
    reset() {
      extend(this.personal, cloneDeep(this.stored.personal));
      extend(this.settings, cloneDeep(this.stored.settings));
    },
  },

  async fetch() {
    this.stored.personal = cloneDeep(this.personal);
    this.stored.settings = cloneDeep(this.settings);
  },
  fetchOnServer: true
})
</script>
