<template>
  <div class="timeline-wrapper">
    <img
      @click="changeSelectWay"
      src="/static/img/crow.png">
    <div class="timeline" v-if="timeLineState">
      <vue-slider
      v-model="time"
      v-bind="options"
      v-on:change="changeTime(time)"
      style="width: 80vw"/>
  </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  data () {
    return {
      time: 298,
      options: {
        min: 298,
        max: 305
      },
      timeLineState: false
    }
  },
  components: {
    VueSlider
  },
  watch: {
    timeLineState: function () {
      this.$emit('changeSelectWay', this.timeLineState)
    }
  },
  methods: {
    changeTime: function (time) {
      this.$emit('changeTime', time)
    },
    changeSelectWay: function () {
      if (this.timeLineState) {
        this.timeLineState = false
      } else {
        this.timeLineState = true
      }
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
img {
  width: 100px;
  height: 100px;
  position: fixed;
  bottom: 25px;
  left: 60px;
  cursor: pointer;
}
</style>
