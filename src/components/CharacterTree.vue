<template>
  <div class="CharacterTree-wrapper" id=treeContainer v-if="$store.state.charactersShow">
    <div class="CharacterTree">
    </div>
  </div>
</template>

<script>
import characters from '@/data/characters'
import echarts from 'echarts'
import option from '@/data/option'

export default {
  data () {
    return {
      characters: characters
    }
  }
}
var self = this
if (self.$store.state.charactersShow) {
  var myChart = echarts.init(document.getElementById('treeContainer'))
  myChart.setOption(option)
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.CharacterTree-wrapper {
  position: fixed;
  top: 10px;
  left: 65px;
  height: 800px;
  width: 1800px;
  border: 5px solid #d8ba7e;
  border-radius: 25px;
  background-color: #f7deab;
}
</style>
