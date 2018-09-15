// TODO:
// - add instructions points
// - add tests

const polyline = require('@mapbox/polyline')

module.exports = function convertRoute(routeObj, precision) {
  if (!routeObj || !routeObj.routes || !routeObj.routes.length) {
    throw new Error('input object must have at least one route');
  }
  if (!precision) precision = 5;
  let output = {
    "type": "FeatureCollection",
    "features": []
  };
  routeObj.routes.forEach(route => {
    // option 1: create a line from the route
    let routeProps = {
      "duration": route.duration,
      "distance": route.distance,
      "weight": route.weight,
      "voiceLocale": route.voiceLocale
    };
    output.features.push({
      "type": "Feature",
      "properties": routeProps,
      "geometry": polyline.toGeoJSON(route.geometry, precision)
    });
    route.legs.forEach(leg => {
      leg.steps.forEach((step, index, array) => {
        // option 2: create a single line from the steps with leg props
        // option 3: create lines for each step with step props
        if (index < array.length - 1) {
          let stepProps = {
            "name": step.name,
            "distance": step.distance,
            "duration": step.duration,
            "intersections": step.intersections,
            "weight": step.weight,
            "driving_side": step.driving_side,
            "mode": step.mode,
            "voiceInstructions": step.voiceInstructions,
            "bannerInstructions": step.bannerInstructions,
            "index": index
          };
          output.features.push({
            "type": "Feature",
            "properties": stepProps,
            "geometry": polyline.toGeoJSON(step.geometry, precision)
          });
        }
        // create points for each maneuver
        let maneuverProps = {
          "type": step.maneuver.type,
          "bearing_after": step.maneuver.bearing_after,
          "bearing_before": step.maneuver.bearing_before,
          "instruction": step.maneuver.instruction,
          "index": index
        };
        output.features.push({
          "type": "Feature",
          "properties": maneuverProps,
          "geometry": {
            "type": "Point",
            "coordinates": step.maneuver.location
          }
        });
        index++;
      });
    });
  });
  return JSON.stringify(output);
}