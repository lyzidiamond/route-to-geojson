# route-to-geojson

Takes a [Mapbox Directions v5 route response](https://www.mapbox.com/api-documentation/#directions-response-object) and converts it to GeoJSON.

Output file contains the following features:

- a single LineString for each route with route properties
- one LineString for each step with step properties
- one Point for each maneuver with maneuver properties

## Usage

Save the route response you wish to convert into a JSON file. Geometry must be encoded as `polyline` or `polyline6` (API returns polyline by default).

The tool takes 2 arguments:

- path to route JSON file
- polyline precision (default is 5)

```bash
git clone git@github.com:lyzidiamond/directions.git
cd directions/scripts/route-to-geojson
npm install
npm link
# if geometry is polyline6
route-to-geojson path/to/route.json 6
# if geometry is polyline
route-to-geojson path/to/route.json
```

## Todo

- [ ] add option to give request URL
- [ ] add points in GeoJSON for locations of voice and banner instructions
