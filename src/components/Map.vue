<template>
  <div id="map-container"></div>
</template>

<script>
import { mapState } from 'vuex'
import mapboxgl from 'mapbox-gl'
import Mixins from './Map/Mixins'
import get3DLayer from '@/utils/get3DLayer'
import threeDModels from '@/data/threeDModels'
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'

export default {
  mixins: [Mixins],
  data () {
    return {
      map: null,
      nav: null
    }
  },
  computed: {
    ...mapState({
      navName: 'navName'
    })
  },
  mounted () {
    this.initMap()
    this.addCityModels()
  },
  watch: {
    navName: function (newValue, oldValue) {
      if (oldValue) {
        let leaveKey = 'leave' + oldValue
        this[leaveKey]()
      }
      if (newValue) {
        let enterKey = 'enter' + newValue
        this[enterKey]()
      }
    }
  },
  methods: {
    initMap: function () {
      mapboxgl.accessToken = mapboxToken
      this.map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/cstao/ck1rer81f20gb1cp40pl6jnbg',
        center: [17.33, 9.82], // 测试 3d 模型
        zoom: 4, // 测试 3d 模型
        pitch: 60 // 测试 3d 模型
      })
      this.nav = new mapboxgl.NavigationControl()
      this.map.addControl(this.nav)
      this.map.on('click', this.mapClickEvent)
    },
    mapClickEvent: function (e) {
      console.log('经纬度是', e.lngLat)
    },
    addCityModels: function () {
      var threeDModelsLayer = get3DLayer('3d-model', threeDModels)
      this.map.on('style.load', () => {
        this.map.addLayer(threeDModelsLayer)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
#map-container {
  width: 100vw;
  height: 100vh;
}
</style>
