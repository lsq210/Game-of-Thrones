export default {
  getEventPointsSource: function (events) {
    var featureList = []
    events.forEach(event => {
      featureList.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: event.position
        },
        properties: {
          id: event.id,
          name: event.name,
          description: event.description
        }
      })
    })
    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: featureList
      }
    }
  },
  getEventLineSource: function (events) {
    var LineList = []
    events.forEach(event => {
      LineList.push(event.position)
    })
    return {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: LineList
        }
      }
    }
  },
  getPointsSource: function (points) {
    var featureList = []
    points.forEach(point => {
      featureList.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: point
        },
        properties: {}
      })
    })
    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: featureList
      }
    }
  },
  getLineSource: function (points) {
    var LineList = []
    points.forEach(point => {
      LineList.push(point)
    })
    return {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: LineList
        }
      }
    }
  }
}
