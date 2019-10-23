<template>
  <div id="map-container"></div>
</template>

<script>
import Events from '@/data/events.js'
import mapboxgl from 'mapbox-gl'
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'

export default {
  data () {
    return {
      map: null,
      nav: null,
      allEvents: Events
    }
  },
  mounted () {
    mapboxgl.accessToken = mapboxToken
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/cstao/ck1rer81f20gb1cp40pl6jnbg'
    })
    this.nav = new mapboxgl.NavigationControl()
    this.map.addControl(this.nav)
    this.map.on('click', (e) => {
      console.log('打印的经纬度是', e.lngLat)
    })
  },
  computed: {
    selectedEvent: function () {
      return this.allEvents.filter(event => {
        return event.beginTime <= this.$store.event.time && event.endTime >= this.$store.event.beginTime
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
