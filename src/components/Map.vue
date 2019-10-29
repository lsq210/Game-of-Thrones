<template>
  <div id="map-container"></div>
</template>

<script>
import Events from '@/data/events.js'
import { mapState } from 'vuex'
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
    this.map.on('load', () => {
      this.allEvents.forEach(event => {
        this.map.loadImage(event.img, (error, image) => {
          if (error) throw error
          this.map.addImage(`img-${event.id}`, image)
        })
      })
      console.log('selectedEvent', this.selectedEvent)
      var GeoJson = this.getGeoJSON(this.selectedEvent)
      console.log(GeoJson)
      this.map.addSource('events', GeoJson)
      this.map.addLayer({
        id: 'event-points',
        type: 'symbol',
        source: 'events',
        layout: {
          'visibility': 'none',
          'icon-image': 'img-{id}',
          'text-field': '{name}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      })
    })
  },
  computed: {
    ...mapState({
      eventState: 'event',
      eventsShow: 'eventsShow'
    }),
    selectedEvent () {
      return this.allEvents.filter(event => {
        return event.beginTime <= this.eventState.time && event.endTime >= this.eventState.time
      })
    }
  },
  watch: {
    selectedEvent: function () {
      console.log('selectedEvent', this.selectedEvent)
      var GeoJson = this.getGeoJSON(this.selectedEvent)
      this.map.getSource('events').setData(GeoJson.data)
    },
    eventsShow: function () {
      console.log(this.eventState.visibility)
      this.map.setLayoutProperty('event-points', 'visibility', this.eventState.visibility)
    }
  },
  methods: {
    // 转换成 GeoJSON 格式
    getGeoJSON: function (events) {
      var featureList = []
      events.forEach(event => {
        featureList.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: event.position
          },
          properties: {
            id: event.id,
            name: event.name
          }
        })
      })
      console.log('featureList', featureList)
      return {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: featureList
        }
      }
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
