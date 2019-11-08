import { mapState } from 'vuex'
import Events from '@/data/events.js'
import dataConverter from '@/utils/dataConverter'
import getPulsingDot from '@/utils/pulsingDot'

export default {
  computed: {
    ...mapState({
      charatersState: 'charaters'
    })
  },
  watch: {
  },
  enter: function () {
    var pulsingDot = getPulsingDot(this.map, 200)
    var routesSource = dataConverter.getLineSource(Events)
    var charactersSource = dataConverter.getPointsSource(Events)
    if (this.map.hasImage('pulsing-dot')) {
      this.map.updateImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })
    } else {
      this.map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })
    }
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
        'icon-image': 'pulsing-dot',
        'text-field': '{name}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
      }
    })
  },
  leave: function () {
    if (this.map.getLayer('character-points')) {
      this.map.removeLayer('character-points')
    }
    if (this.map.getLayer('character-routes')) {
      this.map.removeLayer('character-routes')
    }
    if (this.map.getSource('character-points')) {
      this.map.removeSource('character-points')
    }
    if (this.map.getSource('character-routes')) {
      this.map.removeSource('character-routes')
    }
    if (this.map.hasImage('pulsing-dot')) {
      this.map.removeImage('pulsing-dot')
    }
  },
  methods: {
  }
}
