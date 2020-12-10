<template>
  <div class="tags-form">
    <div class="tags-form__icon-mail">
      <inline-svg src="/icons/main-letter-rassilka.svg"/>
    </div>
    <p class="tags-form__title">Send out invitations to chat with you</p>
    <form action="" @submit.prevent="submit">
      <div class="input-group">
        <input type="text" placeholder="Type a massage to send..." v-model="message" :disabled="invite">
      </div>
      <span v-if="errors.message" class="error input-group__invalid">
        {{ errors.message }}
      </span>
      <div class="tags-form__checkbox">
        <div class="checkbox">
          <input type="checkbox" v-model="sendAllContactList" :disabled="invite">
          <label class="checkbox__label" @click="toggleTargetAll">
            Send to all users from my contact list
          </label>
        </div>
        <div class="checkbox">
          <input type="checkbox" v-model="sendAllUsers" :disabled="invite">
          <label class="checkbox__label" @click="toggleTargetContacts">
            Sent to all HugWord users
          </label>
        </div>
        <span v-if="errors.checkbox" class="input-group__invalid">
          {{ errors.checkbox }}
        </span>
      </div>
      <!--      <p class="tags-form__text">Select a topic</p>-->
      <!--      <div class="input-group input-group_icon_left"><span class="input-group__prefix">-->
      <!--            <inline-svg src="/icons/search.svg"/>-->
      <!--          </span>-->
      <!--        <input type="text"-->
      <!--          placeholder="Enter a conversation topic..."-->
      <!--          value="">-->
      <!--      </div>-->
      <br>
      <div>
        <div class="tags-form__group-topics">
          <vue-select
            :disabled="invite"
            :options="options"
            v-model="selected"
            placeholder="Choose a topic"
          />
          <span v-if="errors.topic" class="error input-group__invalid">
            {{ errors.topic }}
          </span>
        </div>
        <div class="tags-form__btn">
          <div v-if="invite">
            <p class="text-success">Mailing was launched!</p><br>
            <button type="button" class="btn" @click="stop">Stop</button>
          </div>
          <button v-else type="submit" class="btn">Start</button>
        </div>
      </div>
    </form>
    <Mailing :model="modal.mailing"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Mailing from "~/components/profile/modals/mailing-launched-modal.vue"
import * as core from "~/types/core"
import {IAmbassador} from "~/types/core"

interface IOption {
  value: number
  label: string
}

export default Vue.extend({
  components: {Mailing},
  props: {
    ambassadorId: {
      required: false,
      type: Number
    },
    topics: {
      required: false,
      type: Array
    }
  },
  data() {
    return {
      message: '',
      sendAllContactList: false,
      sendAllUsers: false,
      selected: null as IOption | null,
      dashboard: [],
      errors: {
        message: '',
        topic: '',
        checkbox: ''
      },
      modal: {
        mailing: {show: false},
      },
    }
  },
  computed: {
    options(): IOption[] {
      return  this.topics.map((item: any) => ({value: item.id, label: item.title}));
    },
    identity(): IAmbassador {
      return this.$store.state.user.identity;
    },
    invite(): core.IInvite | null {
      return this.identity.invite;
    },
  },
  methods: {
    async submit() {
      const id = this.selected?.value!;
      const data = {
        id: null,
        ambassadorId: this.ambassadorId,
        topic_id: id,
        text: this.message,
        target_all: this.sendAllUsers,
        target_contacts: this.sendAllContactList,
      }

      this.$store.dispatch('invite/start', data).then((data) => {
        this.modal.mailing.show = true;
        this.errors.message = '';
        this.errors.topic = '';
        this.errors.checkbox = '';
      }, errors => {
        this.errors.message = errors.text;
        this.errors.topic = errors.topic_id;
        if (!this.sendAllContactList && !this.sendAllUsers) {
          this.errors.checkbox = 'Target cannot be blank'
        } else {
          this.errors.checkbox = ''
        }
      })
    },
    stop() {
      this.$store.dispatch('invite/stop', this.invite!.id);
    },
    toggleTargetContacts() {
      if (!this.invite) {
        this.sendAllUsers = !this.sendAllUsers;
      }
    },
    toggleTargetAll() {
      if (!this.invite) {
        this.sendAllContactList = !this.sendAllContactList;
      }
    }
  },

  async fetch() {
    await this.$store.dispatch('user/init');
    this.dashboard = await this.$store.dispatch('profile/dashboard');
    this.sendAllUsers = this.invite ? this.invite.target_all : false;
    this.sendAllContactList = this.invite ? this.invite.target_contacts : false;
    this.message = this.invite ? this.invite.text : '';
  },
  fetchOnServer: true
})
</script>

<style scoped>
.error {
  display: block;
  margin-top: 10px;
}
</style>
