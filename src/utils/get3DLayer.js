import mapboxgl from 'mapbox-gl'

const THREE = window.THREE
const GLTFLoader = window.THREE.GLTFLoader

function get3DLayer (id, models) {
  var modelList = models.map(m => m)
  for (let i = 0; i < modelList.length; i++) {
    var modelOrigin = modelList[i].position
    var modelAltitude = modelList[i].altitude || 0
    var modelRotate = modelList[i].rotate || [Math.PI / 2, 0, 0]
    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude)
    modelList[i].modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelList[i].size * modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    }
  }
  return {
    id: id,
    type: 'custom',
    renderingMode: '3d',
    onAdd (map, gl) {
      this.map = map
      for (let i = 0; i < modelList.length; i++) {
        modelList[i].camera = new THREE.Camera()
        modelList[i].scene = new THREE.Scene()
        var directionalLight = new THREE.DirectionalLight(0xffffff)
        directionalLight.position.set(0, -70, 100).normalize()
        modelList[i].scene.add(directionalLight)
        var directionalLight2 = new THREE.DirectionalLight(0xffffff)
        directionalLight2.position.set(0, 70, 100).normalize()
        modelList[i].scene.add(directionalLight2)
        new GLTFLoader().load(
          modelList[i].url,
          function (gltf) { this.scene.add(gltf.scene) }.bind({scene: modelList[i].scene})
        )
        modelList[i].renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true
        })
        modelList[i].renderer.autoClear = false
      }
    },
    render (gl, matrix) {
      modelList.forEach(model => {
        var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), model.modelTransform.rotateX)
        var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), model.modelTransform.rotateY)
        var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), model.modelTransform.rotateZ)
        var m = new THREE.Matrix4().fromArray(matrix)
        var l = new THREE.Matrix4().makeTranslation(model.modelTransform.translateX, model.modelTransform.translateY, model.modelTransform.translateZ)
          .scale(new THREE.Vector3(model.modelTransform.scale, -model.modelTransform.scale, model.modelTransform.scale))
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ)
        model.camera.projectionMatrix = m.multiply(l)
        model.renderer.state.reset()
        model.renderer.render(model.scene, model.camera)
      })
      this.map.triggerRepaint()
    }
  }
}

export default get3DLayer
