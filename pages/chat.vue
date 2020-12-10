<template>

  <div class="chat" :class="{'chat_profile_hide': !profile.show}">
    <div v-if="!$route.params.id" class="select-chat-text">
      Please select a chat
    </div>
    <div class="chat__wrapper" :class="{'chat-show': id}">
      <div class="chat__content">
        <div class="chat__header">
          <div class="chat__col">
            <router-link v-if="id" to="/chat" type="button" class="btn-icon chat__profile-icon-left hide-chat">
              <inline-svg src="/icons/arrow-down.svg"/>
            </router-link>
            <div class="chat__row">
              <router-link :to="'/id/' + user.id" v-if="user" class="chat__title"
                           :class="{'chat__title_online': user.state.online}">
                {{ user.profile.name }}
              </router-link>
              <div v-if="typing.state" class="chat__text">
                Typing
                <span class="jumping-dots">
                  <span class="jumping-dots__dot"></span>
                  <span class="jumping-dots__dot"></span>
                  <span class="jumping-dots__dot"></span>
                </span>
              </div>
            </div>
          </div>
          <div class="chat__actions">
            <button v-if="contact" type="button" class="btn-icon">
              <span class="btn-icon__content" @click="$ws.favoriteToggle(contact)">
                <inline-svg v-if="contact.user.state.favorite" src="/icons/star-full.svg"/>
                <inline-svg v-else src="/icons/favorite.svg"/>
              </span>
            </button>
          </div>
        </div>
        <div class="chat__list" v-if="contact && user && auth.identity">
          <client-only>
            <infinite-loading @infinite="load" direction="top">
              <div slot="no-more" class="no-more">No more</div>
              <div slot="no-results" class="no-results">No messages</div>
            </infinite-loading>
          </client-only>

          <div v-for="message in sort(contact.history)"
               class="chat__message-block"
               :class="'chat__message-block_' + (message.direction === auth.identity.type ? 'right' : 'left')">
            <div v-if="message.direction !== auth.identity.type" class="ava">
              <img v-if="contact.user.avatar" class="ava__img" :src="contact.user.avatar | media(66)"
                   :alt="contact.user.name">
              <span v-else class="ava__img ava_no-img">{{ contact.user.name.substr(0, 1) }}</span>
            </div>
            <div class="chat__message">
              <div class="chat__message-text">{{ message.text }}</div>
              <div class="chat__message-time">{{ message.ts | time }}</div>
              <template v-if="message.direction === auth.identity.type">
                <template v-if="message.id">
                  <inline-svg v-if="contact.seen && message.id <= contact.seen" :src="'/icons/chat/message-read.svg'"
                              class="chat__message-accept"/>
                  <inline-svg v-else :src="'/icons/message-check.svg'" class="chat__message-accept"/>
                </template>
                <inline-svg v-else :src="'/icons/chat/message-delivering.svg'" class="chat__message-accept"/>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form v-if="contact && user" class="chat__input-group" @submit.prevent="sendMessage" :class="{'chat-show': id}">
      <input type="text" maxlength="3000" v-model="text" placeholder="Type something..." @focus="sendTypingStart"
             @blur="sendTypingStop">
      <div class="chat__append">
        <button type="button" class="btn-icon">
          <span class="btn-icon__content">
            <inline-svg src="/icons/smiles.svg"/>
          </span>
        </button>
        <button type="button" class="btn-icon">
          <span class="btn-icon__content">
            <inline-svg src="/icons/attach.svg"/>
          </span>
        </button>
        <button type="button" class="btn-icon btn-icon_type_send">
          <span class="btn-icon__content" @click="sendMessage">
            <inline-svg src="/icons/send.svg"/>
          </span>
        </button>
      </div>
    </form>

    <div class="mobile-contact" :class="{'mobile-contact-hide': id}">
      <ContactList/>
    </div>

    <MiniProfile v-if="user" :contact="contact" :user="user" :profile="profile"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import MiniProfile from '~/components/chat/mini-profile.vue'
import ContactList from "~/components/layout/sidebar/contact-list.vue"
import * as chat from "~/types/chat"
import * as core from '~/types/core'
import find from "lodash/find"

interface ChatMain {
  chatHeight: HTMLElement | null;
}

export default Vue.extend({
  components: {MiniProfile, ContactList},
  data() {
    return {
      from: 0,
      user: null as core.IAmbassador | core.IClient | null,
      text: '',
      typing: {
        timeout: 0,
        state: false
      },
      profile: {show: true},
    };
  },
  computed: {
    auth(): core.IAuth {
      return this.$store.state.user;
    },
    id() {
      return this.$route.params.id;
    },
    contact(): chat.IContact | null {
      return this.$ws.store!.data.state.contact;
    },
    isAmbassador(): boolean {
      const ident = this.$store.getters['user/local'];
      return ident && ident.type == core.EUserType.Ambassador;
    },
    photosLightboxData(): core.ILightBoxImage[] | null {
      const media: core.ILightBoxImage[] = [];
      const filters = this.$options.filters!;
      if (this.user!) {
        for (const photo of this.user!.profile.photos) {
          media.push({
            src: filters.media(photo.image.path),
            thumb: filters.media(photo.image.path, 135, 118),
          });
        }
      }
      return media.length ? media : null;
    },
  },
  mounted() {
    let vh = window.innerHeight * 0.01;
    let chatHeight = document.querySelector<HTMLElement>('.main');
    chatHeight!.style.setProperty('--vh', `${vh}px`);
  },

  watch: {
    '$route.params.id'() {
      this.from = 0;
      this.$fetch();
      this.load();
    }
  },


  methods: {
    sort(messages: chat.IMessage[]) {
      return messages;
      // return messages.sort(function (a: chat.IMessage, b: chat.IMessage) {
      //   return a.ts - b.ts;
      // })
    },

    sendMessage() {
      if (!this.text) {
        return;
      }

      const event: chat.IEvent<chat.IMessageRequest> = {
        type: 'message',
        payload: {
          type: 'default',
          to: this.contact!.user.id,
          text: this.text,
          tag: this.$uuid.v4()
        }
      }

      if (!this.contact!.history) {
        this.contact!.history = []
      }

      const message = {
        type: 'default',
        direction: this.auth.identity!.type,
        ambassador_id: this.auth.identity!.type == core.EUserType.Ambassador ? this.auth.identity!.id : event.payload.to,
        client_id: this.auth.identity!.type != core.EUserType.Ambassador ? this.auth.identity!.id : event.payload.to,
        ts: Math.floor(Date.now() / 1000),
        tag: event.payload.tag,
        text: this.text,
      } as chat.IMessage;

      this.contact!.last_message = message;
      this.contact!.history.push(message);


      this.text = '';
      this.scroll();
      this.$ws.send(event);
    },

    scroll() {
      this.$nextTick(() => {
        const el = document!.querySelector('.chat__list')!;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      });
    },

    sendTypingStart() {
      this.$ws.send({
        type: 'typing-start',
        payload: {id: this.contact!.user.id}
      } as chat.IEvent<chat.IId>);
    },

    sendTypingStop() {
      this.$ws.send({
        type: 'typing-stop',
        payload: {id: this.contact!.user.id}
      } as chat.IEvent<chat.IId>);
    },

    onTypingStart(id: number) {
      if (this.contact && (id == this.contact.user.id)) {
        this.typing.state = true;
      }

      if (this.typing.timeout) {
        window.clearTimeout(this.typing.timeout);
      } else {
        this.typing.timeout = window.setTimeout(() => {
          this.typing.state = false;
        }, 10000);
      }
    },

    onTypingStop(id: number) {
      if (this.contact && (id == this.contact!.user.id)) {
        this.typing.state = false;
      }
    },

    async load($state: any = null) {
      if ($state) {
        if (!this.from) {
          this.scroll();
        }

        const data = await this.$ws.history(Number(this.$route.params.id), this.from);
        if (data.length) {
          this.from = Number(data[0].id);
          ($state as any).loaded();
        } else {
          ($state as any).complete();
        }
      }
    }
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    await this.$fetch();
  },

  async beforeRouteEnter(to, from, next) {
    await next(async (vm) => {
      next();
      await vm.$fetch();
    });
  },

  async fetch() {
    this.user = null;

    if (this.$route.params.id) {
      if (this.$ws.store!.data.state.contact) {
        if (this.$ws.store!.data.state.contact.user.id != Number(this.$route.params.id)) {
          for (const i in this.$ws.store!.data.contacts) {
            const contact = this.$ws.store!.data.contacts[i];
            if (!contact.last_message && contact.user.id == this.$ws.store!.data.state.contact.user.id) {
              this.$ws.store!.data.contacts.splice(Number(i), 1);
              break;
            }
          }
        }
      }

      this.$ws.store!.data.state.contact = null;
      const item = find(this.$store.state.ambassador.list, {'id': Number(this.$route.params.id)});

      if (item) {
        const exists = find(this.$ws.store!.data.contacts, ['user.id', item.id]);
        if (exists) {
          exists.unread = 0;
          this.$ws.store!.data.state.contact = exists;
        } else {
          const contact = new chat.TContact({
            user: {
              id: item.id,
              type: item.type,
              status: item.status,
              email: item.email,
              name: item.profile.name,
              avatar: item.profile.avatar ? item.profile.avatar.path : '',
              state: {
                online: item.state.online,
                favorite: item.state.favorite
              }
            }
          });

          this.$ws.store!.data.state.contact = contact;
          this.$ws.store!.data.contacts.unshift(contact);
        }
      }

      await this.$store.dispatch('user/init');
      if (this.$store.state.user.identity) {
        await this.$wait(() => {
          return process.server || this.$ws.store!.data.user;
        });
      } else {
        this.$glob.layout.error = true;
        return;
      }

      this.user = await this.$store.dispatch('user/one', {id: this.$route.params.id});

      this.$ws.onMessage(this.scroll);
      this.$ws.onTypingStart(this.onTypingStart);
      this.$ws.onTypingStop(this.onTypingStop);

      if (!this.contact) {
        this.$ws.store!.data.state.contact = new chat.TContact({
          user: {
            id: this.user!.id,
            type: this.user!.type,
            status: this.user!.status,
            email: this.user!.email,
            name: this.user!.profile.name,
            avatar: this.user!.profile.avatar ? this.user!.profile.avatar.path : '',
            state: {
              online: this.user!.state.online,
              favorite: this.user!.state.favorite
            }
          }
        });

        const exists = find(this.$ws.store!.data.contacts, ['user.id', this.$ws.store!.data.state.contact.user.id]);

        if (!exists) {
          this.$ws.store!.data.contacts.unshift(this.$ws.store!.data.state.contact);
        } else {
          exists.unread = 0;
        }
      }
      this.load();
    } else {
      this.$ws.store!.data.state.contact = null;
    }
  },
  fetchOnServer: true
});
</script>

<style>
.chat {
  position: relative;
}

.chat .select-chat-text {
  display: inline-block;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
}

.chat .carousel.carousel__profile {
  width: 330px;
  margin: auto;
}

.chat .chat__profile .carousel-item__img {
  height: 115px;
  width: 103px;
  border-radius: 5px;
  background-size: cover;
  display: inline-flex;
  margin-right: 5px;
}
</style>
