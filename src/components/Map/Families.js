// import mapboxgl from 'mapbox-gl'
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
    // 添加政治领土图层
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
  },
  leave: function () {
  },
  methods: {
  }
}
