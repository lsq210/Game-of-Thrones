CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  var minSize = Math.min(w, h)
  if (r > minSize / 2) r = minSize / 2
  // 开始绘制
  this.beginPath()
  this.moveTo(x + r, y)
  this.arcTo(x + w, y, x + w, y + h, r)
  this.arcTo(x + w, y + h, x, y + h, r)
  this.arcTo(x, y + h, x, y, r)
  this.arcTo(x, y, x + w, y, r)
  this.closePath()
  return this
}

function drawRoundImgToMap (map, imgId, img, borderRadius) {
  img.onload = () => {
    var imageData = {
      width: img.width,
      height: img.height,
      data: new Uint8Array(img.width * img.height * 4),
      onAdd: function () {
        var canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        this.context = canvas.getContext('2d')
      },
      render: function () {
        var context = this.context
        var pattern = context.createPattern(img, 'no-repeat')
        context.roundRect(0, 0, img.width, img.height, borderRadius)
        context.fillStyle = pattern
        context.fill()
        this.data = context.getImageData(0, 0, this.width, this.height).data
        map.triggerRepaint()
        return true
      }
    }
    if (map.hasImage(imgId)) {
      map.updateImage(imgId, imageData)
    } else {
      map.addImage(imgId, imageData)
    }
  }
}

export default drawRoundImgToMap
