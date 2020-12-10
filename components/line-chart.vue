<template>
  <canvas ref="canvas" id="canvas"></canvas>
</template>

<script>
import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array | Object,
      required: true
    },
    legend: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },

  watch: {
    'chartData'() {
      this.init();
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      let canvas = document.querySelector('#canvas');
      let ctx = canvas.getContext("2d")
      const gradient = ctx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, 'rgba(63, 170, 255, 1)')
      gradient.addColorStop(1, 'rgba(63, 170, 255, 0.1)')
      this.renderChart({
          labels: this.legend,
          datasets: [
            {
              label: this.legend,
              backgroundColor: gradient,
              borderColor: '#3faaff',
              borderWidth: 2,
              gridLines: {
                display: true,
              },
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: this.chartData
            }
          ],

        },
        {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }
      )
    }
  },
}
</script>
