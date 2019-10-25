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
    this.map.on('load', () => {
      this.allEvents.forEach(event => {
        console.log('allEvents', this.allEvents)
        console.log('event', event)
        this.map.loadImage(event.img, (error, image) => {
          if (error) throw error
          this.map.addImage(event.id, image)
        })
      })
      this.map.addSource('events', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [12, -2]
            },
            properties: {
              title: 'Stark',
              id: 0
            }
          }, {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [16, -2]
            },
            properties: {
              title: 'Lannister',
              id: 1
            }
          }]
        }
      })
      this.map.addLayer({
        id: 'event-points',
        type: 'symbol',
        source: 'events',
        layout: {
          'icon-image': '{id}',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      })
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
