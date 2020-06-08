function routeInterpolate (positions) {
  var routes = positions.map(pos => {
    return {
      position: pos,
      flag: true
    }
  })
  return routes
}

export default routeInterpolate
