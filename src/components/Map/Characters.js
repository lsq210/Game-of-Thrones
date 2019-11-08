// import mapboxgl from 'mapbox-gl'
import { mapState } from 'vuex'
import Events from '@/data/events.js'
import dataConverter from '@/utils/dataConverter'

export default {
  computed: {
    ...mapState({
      charatersState: 'charaters'
    })
  },
  watch: {
  },
  enter: function () {
    var routesSource = dataConverter.getLineSource(Events)
    var charactersSource = dataConverter.getPointsSource(Events)
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
  },
  leave: function () {
  },
  methods: {
  }
}
