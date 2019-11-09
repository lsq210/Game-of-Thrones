import { mapState } from 'vuex'
import dataConverter from '@/utils/dataConverter'
import getPulsingDot from '@/utils/pulsingDot'

function getNextPoint (from, to, speed, duration) {
  var D = Math.sqrt((to[0] - from[0]) * (to[0] - from[0]) + (to[1] - from[1]) * (to[1] - from[1]))
  var d = speed * duration
  if (d >= D) {
    return {
      position: to,
      done: true
    }
  }
  var lng = (to[0] - from[0]) * d / D + from[0]
  var lat = (to[1] - from[1]) * d / D + from[1]
  return {
    position: [lng, lat],
    done: false
  }
}

export default {
  data () {
    return {
      charaterLineAnimation: null
    }
  },
  computed: {
    ...mapState({
      charatersState: 'charaters'
    }),
    characterEvents () {
      return this.charatersState.selectedEvents
    }
  },
  watch: {
    characterEvents: function () {
      this.renderCharacterRoutes(this.characterEvents.map(event => event.position))
    }
  },
  enter: function () {
    var pulsingDot = getPulsingDot(this.map, 100)
    var routesSource = dataConverter.getEventLineSource([])
    var charactersSource = dataConverter.getEventPointsSource(this.characterEvents)
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
    renderCharacterRoutes: function (routes) {
      if (this.charaterLineAnimation) {
        window.cancelAnimationFrame(this.charaterLineAnimation)
        this.charaterLineAnimation = null
      }
      var vm = this
      const speed = 1 / 100
      var pointIndex = 0
      var startTime = performance.now()
      var renderedRoutes = [routes[0]]
      this.map.getSource('character-points')
        .setData(dataConverter.getPointsSource(renderedRoutes).data)
      this.map.getSource('character-routes')
        .setData(dataConverter.getLineSource(renderedRoutes).data)
      vm.charaterLineAnimation = window.requestAnimationFrame(animate)
      function animate () {
        var duration = performance.now() - startTime
        var nextPoint = getNextPoint(routes[pointIndex], routes[pointIndex + 1], speed, duration)
        if (nextPoint.done) {
          vm.map.getSource('character-points')
            .setData(dataConverter.getPointsSource(routes.filter((_, index) => index <= pointIndex + 1)).data)
          if (pointIndex >= routes.length - 2) {
            this.charaterLineAnimation = null
            return
          } else {
            pointIndex++
            startTime = performance.now()
          }
        }
        if (pointIndex === renderedRoutes.length - 1) {
          renderedRoutes.push(nextPoint.position)
        } else {
          renderedRoutes[renderedRoutes.length - 1] = nextPoint.position
        }
        vm.map.getSource('character-routes')
          .setData(dataConverter.getLineSource(renderedRoutes).data)
        vm.charaterLineAnimation = window.requestAnimationFrame(animate)
      }
    }
  }
}
