<template>
  <div id="map-container"></div>
</template>

<script>
import Events from '@/data/events.js'
import Politcal from '@/data/got_politcal.json'
import { mapState } from 'vuex'
import mapboxgl from 'mapbox-gl'
import Mixins from './Map/Mixins'
import dataConverter from '@/utils/dataConverter'
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'

export default {
  mixins: [Mixins],
  data () {
    return {
      map: null,
      nav: null,
      allEvents: Events
    }
  },
  computed: {
    ...mapState({
      familiesState: 'families',
      charatersState: 'charaters',
      layersState: 'layersState',
      navName: 'navName'
    })
  },
  mounted () {
    this.initMap()
    console.log('this.selectedEvents', this.selectedEvents)
    this.map.on('load', () => {
      return
      var routesSource = dataConverter.getLineSource(this.allEvents)
      var charactersSource = dataConverter.getPointsSource(this.allEvents)
      this.map.addSource('character-routes', routesSource)
      this.map.addSource('character-points', charactersSource)
      // 添加人物轨迹图层
      this.map.addLayer({
        id: 'character-routes',
        type: 'line',
        source: 'character-routes',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#650000',
          'line-width': 8
        }
      })
      // 添加人物事件点图层
      this.map.addLayer({
        id: 'character-points',
        type: 'symbol',
        source: 'character-points',
        layout: {
          // 'visibility': 'visible',
          'icon-image': 'event-{id}',
          'text-field': '{name}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      })
      // 添加政治领土图层
      this.map.addLayer({
        id: 'politcal-shape',
        type: 'fill',
        source: {
          type: 'geojson',
          data: Politcal
        },
        layout: {
          'visibility': 'none'
        },
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.4
        }
      })
    })
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
    },
    layersState: {
      handler: function () {
        console.log('layerchange')
        if (this.map.getLayer('event-points')) {
          this.map.setLayoutProperty('event-points', 'visibility', this.layersState.eventLayer)
        }
        if (this.map.getLayer('politcal-shape')) {
          this.map.setLayoutProperty('politcal-shape', 'visibility', this.layersState.politcalLayer)
        }
      },
      deep: true
    }
  },
  methods: {
    initMap: function () {
      mapboxgl.accessToken = mapboxToken
      this.map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/cstao/ck1rer81f20gb1cp40pl6jnbg'
      })
      this.nav = new mapboxgl.NavigationControl()
      this.map.addControl(this.nav)
      this.map.on('click', this.mapClickEvent)
    },
    mapClickEvent: function (e) {
      console.log('经纬度是', e.lngLat)
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
