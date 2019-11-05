<template>
  <div id="map-container"></div>
</template>

<script>
import Events from '@/data/events.js'
import Politcal from '@/data/got_politcal.json'
import { mapState } from 'vuex'
import mapboxgl from 'mapbox-gl'
import drawRoundImgToMap from '@/utils/generateRoundImg'
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
      console.log('经纬度是', e.lngLat)
    })
    this.map.on('load', () => {
      this.allEvents.forEach(event => {
        let img = new Image()
        img.src = event.img
        img.alt = event.name
        drawRoundImgToMap(this.map, `event-${event.id}`, img, 10)
      })
      var GeoJson = this.getGeoJSON(this.selectedEvents)
      console.log('GeoJson', GeoJson)
      this.map.addSource('events', GeoJson)
      this.map.addLayer({
        id: 'event-points',
        type: 'symbol',
        source: 'events',
        layout: {
          'visibility': 'none',
          'icon-image': 'event-{id}',
          'text-field': '{name}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      })
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
    this.map.on('click', 'event-points', e => {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var description = e.features[0].properties.description
      console.log('coordinates', coordinates)
      console.log('description', description)
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map)
    })
    this.map.on('mouseenter', 'event-points', () => {
      this.map.getCanvas().style.cursor = 'pointer'
    })
    this.map.on('mouseleave', 'event-points', () => {
      this.map.getCanvas().style.cursor = ''
    })
  },
  computed: {
    ...mapState({
      eventState: 'events',
      familiesState: 'families',
      charatersState: 'charaters',
      layersState: 'layersState'
    }),
    selectedEvents () {
      return this.eventState.selectedEvents
    },
    flyCenter () {
      return this.eventState.center
    }
  },
  watch: {
    selectedEvents: function () {
      console.log('selectedEvents', this.selectedEvents)
      var GeoJson = this.getGeoJSON(this.selectedEvents)
      this.map.getSource('events').setData(GeoJson.data)
    },
    layersState: {
      handler: function () {
        console.log('layerchange')
        this.map.setLayoutProperty('event-points', 'visibility', this.layersState.eventLayer)
        this.map.setLayoutProperty('politcal-shape', 'visibility', this.layersState.politcalLayer)
      },
      deep: true
    },
    flyCenter: function () {
      this.map.flyTo({
        center: this.flyCenter,
        speed: 0.5,
        zoom: 7
      })
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
            name: event.name,
            description: event.description
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
