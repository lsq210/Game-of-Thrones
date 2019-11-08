import mapboxgl from 'mapbox-gl'
import Events from '@/data/events.js'
import dataConverter from '@/utils/dataConverter'
import drawRoundImgToMap from '@/utils/generateRoundImg'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      eventState: 'events'
    }),
    selectedEvents () {
      return this.eventState.selectedEvents
    },
    flyEventCenter () {
      return this.eventState.center
    }
  },
  watch: {
    selectedEvents: function () {
      var GeoJson = dataConverter.getPointsSource(this.selectedEvents)
      this.map.getSource('events').setData(GeoJson.data)
    },
    flyEventCenter: function () {
      this.map.flyTo({
        center: this.flyEventCenter,
        speed: 0.5,
        zoom: 7
      })
    }
  },
  enter: function () {
    Events.forEach(event => {
      let img = new Image()
      img.src = event.img
      img.alt = event.name
      drawRoundImgToMap(this.map, `event-${event.id}`, img, 10)
    })
    var eventsSource = dataConverter.getPointsSource(this.selectedEvents)
    console.log('eventsSource', eventsSource)
    this.map.addSource('events', eventsSource)
    // 添加事件图层
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
  leave: function () {
  },
  methods: {
  }
}
