<template>
  <div class="dashboard">
    <div class="dashboard__wrapper">
      <div class="dashboard__col">
        <div class="dashboard__row">
          <div class="dashboard__widget-col dashboard_block">
            <div class="widget widget_type_billing"><h3 class="widget__title">Billing</h3>
              <div class="widget widget-billing">
                <div class="widget__row">
                  <div class="widget__col">
                    <inline-svg src="/icons/main-billing.svg"/>
                    <span class="widget__points" v-if="auth.user">Talkens balance: <span>{{
                        Number(auth.user.talkens) + Number(auth.user.bonuses)
                      }}</span> </span>
                  </div>
                </div>
                <!--                <div class="widget__row">-->
                <!--                  <div class="widget__col">-->
                <!--                    <inline-svg src="/icons/main-billing.svg"/>-->
                <!--                    <span class="widget__points">Bonus talkens:<span> 4.00 </span> </span></div>-->
                <!--                </div>-->
                <!--                <button type="button" class="btn">Withdraw</button>-->
              </div>
            </div>
            <div class="widget widget_type_settings"><h3 class="widget__title"></h3>
              <p class="widget__title">Price settings</p>
              <div class="price-settings">
                <div class="price-settings__svg-right">
                  <inline-svg src="/icons/talk-earned.svg"/>
                </div>
                <div class="price-settings__row"><span
                  class="price-settings__line-text-light ">Talkens per message</span></div>
                <div class="counter">
                  <!--                  <button type="button" class="btn-icon"><span class="btn-icon__content"><svg-->
                  <!--                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" fill="#acb5c3"><g><g><rect-->
                  <!--                    y="6" width="14" height="2" rx="2" ry="1"></rect></g></g></svg></span></button>-->
                  <div class="counter__count">1</div>
                  <!--                  <button type="button" class="btn-icon">-->
                  <!--                    <span class="btn-icon__content">-->
                  <!--                      <inline-svg src="/icons/plus-grey.svg"/>-->
                  <!--                    </span>-->
                  <!--                  </button>-->
                </div>
                <div class="price-settings__helper" data-toggle="Lorem ipsum dolore price">?</div>
              </div>
            </div>
          </div>
          <div class="widget widget_type_statistics"><h3 class="widget__title"></h3>
            <p class="widget__title">Your statistics</p>
            <Statistics v-if="dashboard" :stats="dashboard.stat"/>
          </div>
        </div>
        <div class="widget"><h3 class="widget__title">Incomming talkens dinamics</h3>
          <ul class="tabs">
            <li class="tabs-nav__item">
              <a class="nav-link" @click.prevent="setActive('Day')" :class="{ active: isActive('Day') }"
                 href="#Day">Day</a>
            </li>
            <li class="tabs-nav__item">
              <a class="nav-link" @click.prevent="setActive('Week')" :class="{ active: isActive('Week') }" href="#Week">Week</a>
            </li>
            <li class="tabs-nav__item">
              <a class="nav-link" @click.prevent="setActive('Month')" :class="{ active: isActive('Month') }"
                 href="#Month">Month</a>
            </li>
            <li class="tabs-nav__item">
              <a class="nav-link" @click.prevent="setActive('Year')" :class="{ active: isActive('Year') }" href="#Year">Year</a>
            </li>
          </ul>
          <br>
          <div class="tab-content py-3" id="myTabContent">
            <div class="tab-pane fade" :class="{ 'active show': isActive('Day') }" id="Day">
              <div style="width:700px; height: 350px;">
                <lineChart
                  :chartData="chartDayData"
                  :legend="Array.from(Array(24).keys())"
                />
              </div>
            </div>
            <div class="tab-pane fade" :class="{ 'active show': isActive('Week') }" id="Week">
              <div style="width:700px; height: 350px;">
                <lineChart
                  :chartData="chartWeekData"
                  :legend="daysNames"
                />
              </div>
            </div>
            <div class="tab-pane fade" :class="{ 'active show': isActive('Month') }" id="Month">
              <div style="width:700px; height: 350px;">
                <lineChart
                  :chartData="chartMonthData"
                  :legend="Array.from(Array(getCurrMonthLength()), (e, i) => i + 1)"
                />
              </div>
            </div>
            <div class="tab-pane fade" :class="{ 'active show': isActive('Year') }" id="Year">
              <div style="width:700px; height: 350px;">
                <lineChart
                  :chartData="chartYearData"
                  :legend="monthNames"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.auth.user">
        <InviteForm v-if="dashboard" :ambassador-id="this.auth.user.id" :topics="dashboard.topics"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import lineChart from "~/components/line-chart.vue"
import Statistics from '~/components/profile/statistics.vue'
import InviteForm from '~/components/forms/invite-form.vue'
import * as core from "~/types/core";

export default Vue.extend({
  components: {lineChart, Statistics, InviteForm},
  data() {
    return {
      profile: {},
      auth: {} as core.IAuth,
      dashboard: null as any,
      daysNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      activeItem: 'Day'
    }
  },
  computed: {
    chartDayData(): [] {
        if (this.dashboard) {
          console.log('dashboard', this.dashboard)
        }

      return this.dashboard
        ? this.getLegendData(Array.from(Array(24).keys()), this.convertDataToDayName(this.dashboard.chart.day), 'date')
        : [];
    },
    chartWeekData(): [] {
      return this.dashboard
        ? this.getLegendData(this.daysNames, this.convertDataToDayName(this.dashboard.chart.week), 'date')
        : [];
    },
    chartMonthData(): [] {
      return this.dashboard
        ? this.getLegendData(Array.from(Array(this.getCurrMonthLength()), (e, i) => i + 1), this.convertDataToDayNumber(this.dashboard.chart.month), 'date')
        : [];
    },
    chartYearData(): [] {
      return this.dashboard
        ? this.getLegendData(this.monthNames, this.dashboard.chart.year, 'month')
        : [];
    },
    isAmbassador(): boolean {
      const ident = this.$store.getters['user/local'];
      return ident && ident.type == core.EUserType.Ambassador;
    },
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      this.activeItem = menuItem
    },
    convertDataToDayName(data) {
      return data.map((i) => {
        const d = new Date(i.date)
        const day = this.daysNames.findIndex((i) => i === d.toLocaleString('eng', {weekday: 'long'}))
        return {date: day, sum: i.sum}
      })
    },
    getLegendData(legend, data, type) {
      return legend.map((item, idx) => {
        const it = data.find((i) => i[type] === idx + 1)
        return it ? it.sum : 0
      })
    },
    getCurrMonthLength() {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    },
    convertDataToDayNumber(data) {
      return data.map((i) => {
        const d = new Date(i.date)
        return {date: parseInt(d.toLocaleString('eng', {day: 'numeric'})), sum: i.sum}
      })
    }
  },

  async mounted() {
    if (!this.dashboard) {
      const d =  await this.$store.dispatch('profile/dashboard');
      console.log(d);
      this.dashboard = d;
    }
  },

  async fetch() {
    if (!this.isAmbassador) {
      this.$router.push('/');
    } else {
      this.auth = await this.$store.dispatch('user/init');
      this.dashboard = await this.$store.dispatch('profile/dashboard');
    }
  },
  fetchOnServer: false
})
</script>

<style lang="scss">

.tab-content {
  .tab-pane {
    display: none;
  }

  .active {
    display: block;
  }
}

</style>
