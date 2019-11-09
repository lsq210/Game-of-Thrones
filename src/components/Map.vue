<template>
  <div id="map-container"></div>
</template>

<script>
import { mapState } from 'vuex'
import mapboxgl from 'mapbox-gl'
import Mixins from './Map/Mixins'
import * as THREE from 'three'
import GLTFLoader from 'three/examples/js/loaders/GLTFLoader'
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'

export default {
  mixins: [Mixins],
  data () {
    return {
      map: null,
      nav: null
    }
  },
  computed: {
    ...mapState({
      navName: 'navName'
    })
  },
  mounted () {
    this.initMap()
    this.initThreeModel()
  },
  watch: {
    navName: function (newValue, oldValue) {
      if (oldValue) {
        let leaveKey = 'leave' + oldValue
        this[leaveKey]()
      }
      if (newValue) {
        let enterKey = 'enter' + newValue
        this[enterKey]()
      }
    }
  },
  methods: {
    initMap: function () {
      mapboxgl.accessToken = mapboxToken
      this.map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/cstao/ck1rer81f20gb1cp40pl6jnbg',
        antialias: true
      })
      this.nav = new mapboxgl.NavigationControl()
      this.map.addControl(this.nav)
      this.map.on('click', this.mapClickEvent)
    },
    mapClickEvent: function (e) {
      console.log('经纬度是', e.lngLat)
    },
    initThreeModel: function () {
      var modelOrigin = [0, 0]
      var modelAltitude = 0
      var modelRotate = [Math.PI / 2, 0, 0]
      var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude)
      var modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since our 3D model is in real world meters, a scale transform needs to be
        * applied since the CustomLayerInterface expects units in MercatorCoordinates.
        */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
      }
      // configuration of the custom layer for a 3D model per the CustomLayerInterface
      var customLayer = {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
          this.camera = new THREE.Camera()
          this.scene = new THREE.Scene()
          // create two three.js lights to illuminate the model
          var directionalLight = new THREE.DirectionalLight(0xffffff)
          directionalLight.position.set(0, -70, 100).normalize()
          this.scene.add(directionalLight)
          var directionalLight2 = new THREE.DirectionalLight(0xffffff)
          directionalLight2.position.set(0, 70, 100).normalize()
          this.scene.add(directionalLight2)
          // use the three.js GLTF loader to add the 3D model to the three.js scene
          let self = this
          var loader = new GLTFLoader()
          loader.load('https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
            function (gltf) {
              self.scene.add(gltf.scene)
            }).bind(this)
          this.map = map
          // use the Mapbox GL JS map canvas for three.js
          this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
          })
          this.renderer.autoClear = false
        },
        render: function (gl, matrix) {
          var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX)
          var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY)
          var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ)
          var m = new THREE.Matrix4().fromArray(matrix)
          var l = new THREE.Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
            .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ)
          this.camera.projectionMatrix = m.multiply(l)
          this.renderer.state.reset()
          this.renderer.render(this.scene, this.camera)
          this.map.triggerRepaint()
        }
      }
      this.map.on('style.load', () => {
        this.map.addLayer(customLayer)
      })
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
