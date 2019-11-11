import { mapState } from 'vuex'
import get3DLayer from '@/utils/get3DLayer'
import threeDModels from '@/data/threeDModels'

export default {
  computed: {
    ...mapState({
      threelayer: 'threelayer'
    }),
    flyModelCenter () {
      return this.threelayer.center
    },
    threeLayerVisible () {
      return this.threelayer.visible
    }
  },
  watch: {
    threeLayerVisible: function () {
      if (this.threeLayerVisible) {
        console.log('three')
        this.addCityModels()
      } else {
        if (this.map.getLayer('3d-model')) {
          this.map.removeLayer('3d-model')
        }
      }
    },
    flyModelCenter: function () {
      this.map.flyTo({
        center: this.flyModelCenter,
        speed: 0.5,
        zoom: 7
      })
    }
  },
  methods: {
    addCityModels: function () {
      var threeDModelsLayer = get3DLayer('3d-model', threeDModels)
      this.map.addLayer(threeDModelsLayer)
    }
  }
}
