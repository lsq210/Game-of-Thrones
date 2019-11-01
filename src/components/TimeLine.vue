<template>
  <div class="timeline" v-if="$store.state.eventsShow">
    <vue-slider
    v-model="time"
    v-bind="options"
    v-on:change="changeTime(time)"
    style="width: 90vw"/>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider
  },
  data () {
    return {
      time: 298,
      options: {
        min: 298,
        max: 320
      }
    }
  },
  methods: {
    changeTime: function (time) {
      this.$store.commit('changeTime', time)
      // console.log('time', this.time)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
.timeline {
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  width: 100vw;
  height: 8vh;
  margin:0 auto;
}
</style>
