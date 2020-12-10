<template>
  <form class="profile-personals" @submit.prevent="submit" autocomplete="off">
    <div class="profile-statistics">
      <!--      <div class="profile-statistics__col">-->
      <!--        <h4 class="profile-statistics__title">Filling out your profile</h4>-->
      <!--        <div class="progress-bar">-->
      <!--          <div class="progress-bar__bar" style="width: 70%;">-->
      <!--            <div class="progress-bar__text">70%</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <i class="divider"></i>-->
      <!--        <div class="profile-field profile-field_done">-->
      <!--          <div class="profile-field__text">Avatar is set</div>-->
      <!--          <i class="profile-field__check">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7.38" width="12" height="8" fill="#3faaff">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="1.64" y="2.69" width="8" height="2" transform="matrix(0.65, -0.76, 0.76, 0.65, -0.83, 5.57)"></rect>-->
      <!--                  <rect x="1.55" y="2.49" width="2" height="5" transform="translate(-2.9 3.68) rotate(-49.43)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--        <div class="profile-field profile-field_done">-->
      <!--          <div class="profile-field__text">Cover image is set</div>-->
      <!--          <i class="profile-field__check">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7.38" width="12" height="8" fill="#3faaff">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="1.64" y="2.69" width="8" height="2" transform="matrix(0.65, -0.76, 0.76, 0.65, -0.83, 5.57)"></rect>-->
      <!--                  <rect x="1.55" y="2.49" width="2" height="5" transform="translate(-2.9 3.68) rotate(-49.43)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--        <div class="profile-field">-->
      <!--          <div class="profile-field__text">About You is filled</div>-->
      <!--          <i class="profile-field__close" data-tooltip="Available after the first deposit">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.4 11.4" width="11.4" height="11.4" fill="#b6beca">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="-1.3" y="4.7" width="14" height="2" transform="translate(-2.36 5.79) rotate(-45.61)"></rect>-->
      <!--                  <rect x="4.7" y="-1.3" width="2" height="14" transform="translate(-2.36 5.79) rotate(-45.61)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--        <div class="profile-field profile-field_done">-->
      <!--          <div class="profile-field__text">One or more photo is uploaded</div>-->
      <!--          <i class="profile-field__check">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7.38" width="12" height="8" fill="#3faaff">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="1.64" y="2.69" width="8" height="2" transform="matrix(0.65, -0.76, 0.76, 0.65, -0.83, 5.57)"></rect>-->
      <!--                  <rect x="1.55" y="2.49" width="2" height="5" transform="translate(-2.9 3.68) rotate(-49.43)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--        <div class="profile-field profile-field_done">-->
      <!--          <div class="profile-field__text">Topics of interests is filled</div>-->
      <!--          <i class="profile-field__check">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7.38" width="12" height="8" fill="#3faaff">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="1.64" y="2.69" width="8" height="2" transform="matrix(0.65, -0.76, 0.76, 0.65, -0.83, 5.57)"></rect>-->
      <!--                  <rect x="1.55" y="2.49" width="2" height="5" transform="translate(-2.9 3.68) rotate(-49.43)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--        <div class="profile-field">-->
      <!--          <div class="profile-field__text">Your email verified</div>-->
      <!--          <i class="profile-field__close" data-tooltip="Available after the first deposit">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.4 11.4" width="11.4" height="11.4" fill="#b6beca">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="-1.3" y="4.7" width="14" height="2" transform="translate(-2.36 5.79) rotate(-45.61)"></rect>-->
      <!--                  <rect x="4.7" y="-1.3" width="2" height="14" transform="translate(-2.36 5.79) rotate(-45.61)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--        <div class="profile-field profile-field_done">-->
      <!--          <div class="profile-field__text">Your name filled</div>-->
      <!--          <i class="profile-field__check">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7.38" width="12" height="8" fill="#3faaff">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="1.64" y="2.69" width="8" height="2" transform="matrix(0.65, -0.76, 0.76, 0.65, -0.83, 5.57)"></rect>-->
      <!--                  <rect x="1.55" y="2.49" width="2" height="5" transform="translate(-2.9 3.68) rotate(-49.43)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--        <div class="profile-field profile-field_done">-->
      <!--          <div class="profile-field__text">You stated your gender</div>-->
      <!--          <i class="profile-field__check">-->
      <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 7.38" width="12" height="8" fill="#3faaff">-->
      <!--              <g>-->
      <!--                <g>-->
      <!--                  <rect x="1.64" y="2.69" width="8" height="2" transform="matrix(0.65, -0.76, 0.76, 0.65, -0.83, 5.57)"></rect>-->
      <!--                  <rect x="1.55" y="2.49" width="2" height="5" transform="translate(-2.9 3.68) rotate(-49.43)"></rect>-->
      <!--                </g>-->
      <!--              </g>-->
      <!--            </svg>-->
      <!--          </i></div>-->
      <!--      </div>-->
      <div class="profile-statistics__col">
        <Statistics :stats="stats" />
      </div>

      <div>
        <ul class="tabs">
          <li class="tabs-nav__item">
            <a class="nav-link" @click.prevent="setActive('Day')" :class="{ active: isActive('Day') }" href="#Day">Day</a>
          </li>
          <li class="tabs-nav__item">
            <a class="nav-link" @click.prevent="setActive('Week')" :class="{ active: isActive('Week') }" href="#Week">Week</a>
          </li>
          <li class="tabs-nav__item">
            <a class="nav-link" @click.prevent="setActive('Month')" :class="{ active: isActive('Month') }" href="#Month">Month</a>
          </li>
          <li class="tabs-nav__item">
            <a class="nav-link" @click.prevent="setActive('Year')" :class="{ active: isActive('Year') }" href="#contact">Year</a>
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
  </form>
</template>

<script lang="ts">
import Vue, {PropType} from "vue"
import {IStatistics} from "../profile.vue"
import lineChart from "~/components/line-chart.vue"
import Statistics from '~/components/profile/statistics.vue'

export default Vue.extend({
  components: {lineChart, Statistics},
  props: {
    statistics: {type: Object as PropType<IStatistics>, required: true},
  },
  data() {
    return {
      stats: [],
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
        const res = this.getLegendData(Array.from(Array(24).keys()), this.convertDataToDayName(this.dashboard.chart.day), 'date');
        return res;
      } else {
        return [];
      }
    },
    chartWeekData(): [] {
      if (this.dashboard) {
        const res = this.getLegendData(this.daysNames, this.convertDataToDayName(this.dashboard.chart.week), 'date');
        return res;
      } else {
        return [];
      }
    },
    chartMonthData(): [] {
      if (this.dashboard) {
        const res = this.getLegendData(Array.from(Array(this.getCurrMonthLength()), (e, i) => i + 1), this.convertDataToDayNumber(this.dashboard.chart.month), 'date');
        return res;
      } else {
        return [];
      }
    },
    chartYearData(): [] {
      if (this.dashboard) {
        const res = this.getLegendData(this.monthNames, this.dashboard.chart.year, 'month');
        return res;
      } else {
        return [];
      }
    }
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
      if (data && !data.length) {
        return legend.map(i => 0)
      }

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
  mounted() {

  },
  async fetch() {
    this.stats = await this.$store.dispatch('profile/stat');
    this.dashboard = await this.$store.dispatch('profile/dashboard')
  },
  fetchOnServer: true
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
