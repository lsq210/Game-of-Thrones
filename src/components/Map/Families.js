import Politcal from '@/data/got_politcal.json'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      familiesState: 'families'
    })
  },
  watch: {
  },
  enter: function () {
    var politcalSource = {
      type: 'geojson',
      data: Politcal
    }
    this.map.addSource('politcal-shape', politcalSource)
    // 添加政治领土图层
    this.map.addLayer({
      id: 'politcal-shape',
      type: 'fill',
      source: 'politcal-shape',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        'fill-color': ['get', 'color'],
        'fill-opacity': 0.4
      }
    })
  },
  leave: function () {
    if (this.map.getLayer('politcal-shape')) {
      this.map.removeLayer('politcal-shape')
    }
    if (this.map.getSource('politcal-shape')) {
      this.map.removeSource('politcal-shape')
    }
  },
  methods: {
  }
}
