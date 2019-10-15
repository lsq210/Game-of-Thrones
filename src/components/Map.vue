<template>
  <div class="wrapper">
    <div id="map-container"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'

export default {
  data () {
    return {
      map: null
    }
  },
  mounted () {
    mapboxgl.accessToken = mapboxToken
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/cstao/ck1rer81f20gb1cp40pl6jnbg'
    })
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  #map-container {
    width: 100vw;
    height: 100vh;
  }
}
</style>
