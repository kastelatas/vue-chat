  <template>
  <section v-if="!isAmbassador" class="main__content">
    <div class="banner">
      <div class="banner__content"><h1 class="banner__text">Find</h1>
        <h2 class="banner__text">your perfect interlocutor</h2>
        <h3 class="banner__text">It’s not a dating site</h3>
        <span class="banner__text">But finally you have a safe place</span>
        <span class="banner__text">where you can talk to anyone about anything you want</span>
      </div>
    </div>

    <section class="persons-block">
      <form class="search-block" @submit.prevent="search">
        <div class="search-block__content">
          <div class="input-group input-group_icon_left">
            <div class="search-block__row">
              <div class="search-block__group-select">
                <span class="search-loupe-icon">
                  <span class="input-group__prefix">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 17.86 15.8" width="17.86" height="15.8" fill="#dce1e4">
                      <g><g>
                        <path
                          d="M3.06,3.92a5,5,0,1,1,.86,7,5,5,0,0,1-.86-7M1.49,2.69a7,7,0,1,0,9.83-1.2,7,7,0,0,0-9.83,1.2Z"></path>
                        <rect x="13.48" y="9.35" width="2" height="7"
                              transform="translate(-4.57 16.34) rotate(-51.96)"></rect>
                      </g></g>
                    </svg>
                  </span>
                </span>
                <div class="input-group input-group_block">
                  <div class="select__control">
                    <vue-select
                      v-model="options.filter.topic"
                      :options="topicsOptions"
                    />
                  </div>
                </div>
              </div>
              <div style="display:flex">
                <div class="input-group__append">
                  <div class="search-block__btn">
                    <button type="submit" class="btn btn_block">Search</button>
                    <div class="search-icon">
                      <img src="/icons/search.svg">
                    </div>
                  </div>
                </div>
                <div class="input-group__append">
                  <div class="search-block__btn  clear-btn">
                    <button class="btn btn_block" @click="clear">Show all</button>
                    <div class="search-icon" @click="clear"><img src="/icons/close.svg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="nav-panel">
        <div class="nav-panel__row">
          <div class="check-online">
            <div class="checkbox">
              <input v-model="options.filter.online" type="checkbox" id="filter-online-only-checkbox"
                     @change="changeOnline">
              <label class="checkbox__label" for="filter-online-only-checkbox">Online only</label>
            </div>
          </div>
          <nav class="tabs-nav">
            <ul class="tabs-nav__container">
              <li class="tabs-nav__item" :class="{'tabs-nav__item_active': !options.filter.gender}"
                  @click="setGender(null)">
                all
              </li>
              <li class="tabs-nav__item" :class="{'tabs-nav__item_active': options.filter.gender === 2}"
                  @click="setGender(2)">
                only women
              </li>
              <li class="tabs-nav__item" :class="{'tabs-nav__item_active': options.filter.gender === 1}"
                  @click="setGender(1)">
                only man
              </li>
            </ul>
          </nav>
          <Sorting :options="['rating', 'name']" :model="options.sort"/>
        </div>
      </div>
      <div class="persons-block__overlay">
        <div class="persons-block__list">
          <div v-for="ambassador in ambassadors" class="person-card">
            <router-link :to="'/id/' + ambassador.id" class="person-card__header">
              <img
                :src="$options.filters.media(ambassador.profile.avatar.path, 247, 280)"
                :alt="ambassador.profile.name" class="person-card__img">
              <Rating class="person-card__stars-container"
                      :rating="ambassador.profile.rating ? ambassador.profile.rating.rating : 0"/>
            </router-link>
            <div class="person-card__content">
              <div class="person-card__row">
                <span class="person-card__name">{{ ambassador.profile.name }}</span>
                <span class="person-card__status" :class="{'person-card__status_success': ambassador.state.online}">
                  {{ ambassador.state.online ? 'Online' : 'Offline' }}
                </span>
              </div>
              <div class="person-card__tags-block">
                <span class="person-card__tags-block-title">Topics of conversation</span>
                <Topics :topics="ambassador.profile.topics"/>
              </div>
              <router-link :to="'/chat/' + ambassador.id" class="btn btn_icon">
                <span>Start chat</span>
              </router-link>
            </div>
          </div>
        </div>

        <infinite-loading v-if="infinite" @infinite="load">
          <div slot="no-more" class="no-more">No more</div>
          <div slot="no-results" class="no-results">No results</div>
        </infinite-loading>

        <button v-if="!infinite && ambassadors.length === 20" @click="infinite = true" class="btn load-more">LOAD MORE</button>
      </div>
    </section>
  </section>
</template>




  <script lang="ts">
import Vue from 'vue'
import DropdownMenu from "@innologica/vue-dropdown-menu"
import Sorting from "~/components/layout/sorting.vue"
import Rating from "~/components/ui/user/rating.vue"
import Topics from "~/components/ui/user/topics.vue"

import {filtersDefaults} from "~/store/filters"
import * as core from "~/types/core"
import cloneDeep from "lodash/cloneDeep"

interface IOption {
  value: number
  label: string
}

export default Vue.extend({
  props: ['topic'],
  components: {Rating, Topics, Sorting, DropdownMenu},
  data() {
    return {
      page: 1,
      infinite: false,
      options: cloneDeep(filtersDefaults.ambassadors),
      ambassadors: [] as core.IAmbassador[]
    }
  },
  computed: {
    isAmbassador(): boolean {
      const ident = this.$store.getters['user/local'];
      return ident && ident.type == core.EUserType.Ambassador;
    },
    isAuth(): boolean {
      return !!this.$store.getters['user/local'];
    },
    topicsOptions(): IOption[] {
      return this.$store.state.topics
        ? this.$store.state.topics.map((item) => ({value: item.slug, label: item.title}))
        : [];
    },
  },
  watch: {
    'options.sort.attribute': function (n, o) {
      o && this.load();
    },
    'options.sort.reverse': function () {
      this.load();
    },
  },
  methods: {
    clear() {
      this.options.filter.topic = null;
      if (this.$route.name != 'index') {
        this.$router.push('/');
      } else {
        this.load();
      }
    },
    setGender(gender) {
      this.options.filter.gender = gender;
      this.load();
    },
    changeOnline() {
      this.load();
    },

    search() {
      if (this.options.filter.topic) {
        if (this.options.filter.topic && typeof this.options.filter.topic != 'string') {
          this.options.filter.topic = this.options.filter.topic['value'];
        }
        this.$router.push('/topic/' + this.options.filter.topic);
      } else {
        this.$router.push('/');
      }
    },

    async load($state: any = null) {
      if (!$state) {
        this.page = 1;
      }

      this.options.filter.topic = this.$route.params.topic ?? null
      if (this.options.filter.topic && typeof this.options.filter.topic != 'string') {
        this.options.filter.topic = this.options.filter.topic['value'];
      }

      this.$store.commit('filters/ambassadors', cloneDeep(this.options));
      const ambassadors = await this.$store.dispatch('ambassador/all', {page: this.page});

      if ($state && !($state instanceof Event)) {
        if (ambassadors.length) {
          if (this.page == 1) {
            this.infinite = false;
          }
          this.ambassadors.push(...ambassadors);
          ($state as any).loaded();
        } else {
          ($state as any).complete();
        }
      } else {
        this.ambassadors = ambassadors;
      }

      this.page += 1;
    },
  },

  mounted() {
    if (!this.ambassadors.length) {
      this.infinite = true;
    }
  },

  async fetch() {
    if (this.isAmbassador) {
      this.$router.push('/dashboard');
    }

    if (process.server) {
      await this.load();
    }
  },
})
</script>

<style lang="scss">

.search-block__row .select__input:focus::placeholder {
  color: transparent;
}

.search-block__row .select__control {
  position: relative;
  top: 3px;

  .vs__dropdown-toggle {
    border: none;
    width: 100%;
    font-family: "Fira Sans Light", sans-serif;
    color: #333;
    padding-left: 10px;
  }
}

</style>

<style scoped>
.btn.load-more, .no-more, .no-results {
  margin-bottom: 19px;
}

.check-online .checkbox {
  user-select: none;
}

.tags-block .tag.active {
  border-width: 3px;
}

</style>
