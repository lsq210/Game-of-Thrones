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
    this.map.addSource('events', eventsSource)
    // 添加事件图层
    this.map.addLayer({
      id: 'event-points',
      type: 'symbol',
      source: 'events',
      layout: {
        'visibility': 'visible',
        'icon-image': 'event-{id}',
        'text-field': '{name}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
      }
    })
    this.map.on('click', 'event-points', this.eventClickListener)
    this.map.on('mouseenter', 'event-points', this.eventMouseenterListener)
    this.map.on('mouseleave', 'event-points', this.eventMouseleaveListener)
  },
  leave: function () {
    this.map.off('click', 'event-points', this.eventClickListener)
    this.map.off('mouseenter', 'event-points', this.eventMouseenterListener)
    this.map.off('mouseleave', 'event-points', this.eventMouseleaveListener)
    if (this.map.getLayer('event-points')) {
      this.map.removeLayer('event-points')
    }
    if (this.map.getSource('events')) {
      this.map.removeSource('events')
    }
    Events.forEach(event => {
      if (this.map.hasImage(`event-${event.id}`)) {
        this.map.removeImage(`event-${event.id}`)
      }
    })
  },
  methods: {
    eventClickListener: function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var description = e.features[0].properties.description
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map)
    },
    eventMouseenterListener: function () {
      this.map.getCanvas().style.cursor = 'pointer'
    },
    eventMouseleaveListener: function () {
      this.map.getCanvas().style.cursor = ''
    }
  }
}
