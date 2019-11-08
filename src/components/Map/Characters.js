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
    var mapInstance = this.map
    // 点样式
    var pulsingDot = {
      width: 200,
      height: 200,
      data: new Uint8Array(200 * 200 * 4),
      onAdd: function () {
        var canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 200
        this.context = canvas.getContext('2d')
        console.log(this)
      },
      render: function () {
        var duration = 1000
        var t = (performance.now() % duration) / duration
        var radius = 200 / 2 * 0.3
        var outerRadius = 200 / 2 * 0.7 * t + radius
        var context = this.context
        // draw outer circle
        context.clearRect(0, 0, 200, 200)
        context.beginPath()
        context.arc(200 / 2, 200 / 2, outerRadius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
        context.fill()
        // draw inner circle
        context.beginPath()
        context.arc(200 / 2, 200 / 2, radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(255, 50, 50, 1)'
        context.strokeStyle = 'white'
        context.lineWidth = 2 + 4 * (1 - t)
        context.fill()
        context.stroke()
        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, 200, 200).data
        // keep the map repainting
        mapInstance.triggerRepaint()
        // return `true` to let the map know that the image was updated
        return true
      }
    }
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
