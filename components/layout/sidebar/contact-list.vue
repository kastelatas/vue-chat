<template>
  <aside class="sidebar-left sidebar-contact">
    <aside class="sidebar-left__content">
      <div class="sidebar-left__ltr">
        <div v-if="identity && similar.length" style="padding-left: 20px">
          <h2 class="sidebar-left__title" v-if="identity.profile">See more like
            {{ identity.profile && identity.profile.name }}</h2>
          <div style="padding-left: 20px" class="animated fadeIn similar-ambassador">
            <SimilarAmbassador :similar="similar"/>
          </div>
        </div>
        <div>
          <div class="input-group input-group_accent">
            <input type="text" placeholder="Search" v-model="search" v-click-outside="searchBlur">
            <span class="input-group__append">
              <button type="button" class="btn-icon btn-icon_type_add">
                <!-- <span class="btn-icon__content"> -->
                <!-- <inline-svg src="/icons/plus-grey.svg"/> -->
                <!-- </span> -->
              </button>
            </span>
          </div>
          <nav class="tabs-nav">
            <ul class="tabs-nav__container">
              <li class="tabs-nav__item" :class="{'tabs-nav__item_active': !this.favoritesMode}" @click="contactsOpen">
                All contacts
              </li>
              <li class="tabs-nav__item" :class="{'tabs-nav__item_active': this.favoritesMode}" @click="favoritesOpen">
                Favorites
              </li>
            </ul>
          </nav>
          <div class="contacts-group">
            <div v-for="contact in contacts" class="contact-wrapper">
              <router-link class="contact" active-class="contact_active" :to="'/chat/' + contact.user.id">
                <div class="ava" :class="{'ava_online': contact.user.state.online}">
                  <img v-if="contact.user.avatar" class="ava__img" :src="contact.user.avatar | media(45*2)"
                    :alt="contact.user.name">
                  <span v-else class="ava__img ava_no-img">{{ contact.user.name.substr(0, 1) }}</span>
                </div>
                <div class="contact__content">
                  <div class="contact__title">{{ contact.user.name }}</div>
                  <div v-if="contact.last_message" class="contact__message">{{ contact.last_message.text }}</div>
                </div>
                <div class="contact__info">
                  <div v-if="contact.unread" class="counts">{{ contact.unread }}</div>
                  <div v-if="contact.last_message" class="contact__date">{{ contact.last_message.ts | time }}</div>
                </div>
              </router-link>
              <button type="button" class="btn-icon">
                <inline-svg src="/icons/close.svg" @click="contactRemove(contact)"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </aside>
</template>

<script lang="ts">
import Vue from "vue";
import * as chat from "~/types/chat"
import SimilarAmbassador from "~/components/ui/user/similar-ambassador.vue"
import * as core from "~/types/core";

export default Vue.extend({
  components: {SimilarAmbassador},
  data() {
    return {
      search: '',
      favoritesMode: false,
      data: this.$ws.store!.data,
      similarAmbassador: []
    }
  },

  computed: {
    contacts(): chat.IContact[] {
      let contacts = this.favoritesMode ? this.data.favorites : this.data.contacts;
      contacts = contacts.filter((item: chat.IContact) => {
        return (item.user.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
      });

      return contacts.sort(function (a: chat.IContact, b: chat.IContact) {
        return (b.last_message ? b.last_message.ts : 0) - (a.last_message ? a.last_message.ts : 0);
      }).sort(function (a: chat.IContact, b: chat.IContact) {
        if ((!b.last_message && a.last_message)) {
          return 1;
        } else if (!a.last_message && b.last_message) {
          return -1;
        }
        return 0;
      });
    },
    identity(): core.IUser | null {
      return this.$store.state.user.identity;
    },
    similar(): core.IAmbassador[] {
      if (this.$store.state.ambassador.similar.length > 3){
        this.similarAmbassador = this.$store.state.ambassador.similar.concat(this.$store.state.ambassador.similar[0])
      } else {
        this.similarAmbassador = this.$store.state.ambassador.similar
      }
      return this.similarAmbassador;
    },
  },

  watch: {
    '$route.params.id'() {
      this.$fetch();
    }
  },

  methods: {
    contactsOpen() {
      this.favoritesMode = false;
    },
    favoritesOpen() {
      this.favoritesMode = true;
      this.$ws.favorites();
    },
    contactRemove(contact: chat.IContact) {
      if (this.favoritesMode) {
        this.$ws.favoriteRemove(contact);
      } else {
        this.$ws.contactRemove(contact);
      }
      this.$router.push('/chat');
    },
    searchBlur() {
      this.search = '';
    },
  },
  async fetch() {
    const ident = this.$store.getters['user/local'];
    if (ident && (ident.type == core.EUserType.Client)) {
      if (this.$route.params.id) {
        await this.$store.dispatch('ambassador/similar', this.$route.params.id);
      }
    }
  },
  fetchOnServer: false
});
</script>
