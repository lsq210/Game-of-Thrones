export default {
  getPointsSource: function (events) {
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
  getLineSource: function (events) {
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
  }
}
