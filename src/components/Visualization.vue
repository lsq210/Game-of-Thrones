<template>
  <div class="visualization-wrapper" v-if="VisualizationState">
    <img
      class="chart-logo"
      src="/static/img/GOT.png"
      @click="returnHome"/>
    <div class="chart-nav">
      <div
        class="chart-item"
        v-for="(chart, index) in chartNav"
        v-bind:key="`chartsList-${index}`"
        v-on:click="changeChartNav(chart)">
        <div class="chart-name" v-bind:class="{'active': chart === activeChart}">{{ chart.name }}</div>
      </div>
    </div>
    <div class="chart-container">
      <iframe id="show-chart" frameborder="0" scrolling="no" style="background-color:transparent; position：absolute;
      width: 100%; height:100%; top: 0;left:0;bottom:0;" v-bind:src="activeChart.href"></iframe>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeChart: {
        name: 'Bar',
        href: 'http://127.0.0.1:5500/game-of-thrones-master/bubble-character/index.html'
      },
      chartNav: [
        {
          name: 'Bar',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/region-percent/'
        },
        {
          name: 'Scatter',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/duration-gender-percent/'
        },
        {
          name: 'HeatMap',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/matrix/'
        },
        {
          name: 'Scenes',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/scenes-character/'
        },
        {
          name: 'ScreenTime',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/duration-character/'
        },
        {
          name: 'Percent',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/region-percent/'
        },
        {
          name: 'Gender',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/duration-gender-season/'
        },
        {
          name: 'Wordcount',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/wordcount-gender-episode/'
        },
        {
          name: 'Relations Force',
          href: 'http://127.0.0.1:5500/game-of-thrones-master/relations-force/index.html'
        },
        {
          name: 'Relations Circle',
          href: 'http://127.0.0.1:5500/game-of-thrones-master/relations-circle/index.html'
        },
        {
          name: 'Sequences',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/opening-seq-matrix/'
        },
        {
          name: 'Prediction',
          href: 'http://127.0.0.1:5500/game-of-thrones-master/episode-character-scatter/'
        },
        {
          name: 'Locations',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/opening-locations-force/'
        },
        {
          name: 'Characters',
          href: 'https://jeffreylancaster.github.io/game-of-thrones/relations-circle/'
        },
        {
          name: 'Characters',
          href: 'http://127.0.0.1:5500/game-of-thrones-master/bubble-character/index.html'
        },
        {
          name: 'Characters',
          href: 'http://127.0.0.1:5500/game-of-thrones-master/character-arcs/index.html'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      navName: 'navName'
    }),
    VisualizationState () {
      if (this.navName === 'Visualization') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    changeChartNav: function (chart) {
      this.activeChart = chart
    },
    returnHome: function () {
      this.$store.commit('changeNav', null)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var.scss';
$chart-nav-width: 200px;
.visualization-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  .chart-logo {
    position: fixed;
    top: 0;
    left: 0;
    padding: 16px 8px;
    height: 14vh;
    width: $chart-nav-width;
    background-color: $text-color;
    cursor: pointer;
  }
  .chart-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: $chart-nav-width;
    margin-top: 12vh;
    overflow-y: auto;
    height: 86vh;
    background-color: $text-color;
    color: $primer-color;
    .chart-item {
      cursor: pointer;
      .chart-name {
        font-size: 20px;
        height: 54px;
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        padding: 10px 10px 0 20px;
        &:hover {
          background-color: #020520;
        }
      }
      .active {
        background-color: $second-color;
      }
    }
  }
  .chart-container {
    margin-left: $chart-nav-width;
    padding: 50px 100px 50px 80px;
    height: 100vh;
    width: 90vw;
  }
}
</style>
