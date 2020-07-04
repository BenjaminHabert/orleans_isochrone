<template>
  <div>
    <l-geo-json :geojson="geojson"></l-geo-json>
  </div>
</template>

<script>
import { LGeoJson } from "vue2-leaflet";

import { tempGeoJson } from "./tempgeojson.js";

export default {
  name: "Isochrone",
  components: {
    LGeoJson
  },
  props: ["marker"],
  computed: {
    geojson() {
      const geojson = { ...tempGeoJson };
      const firstPoint = geojson.features[0].geometry.coordinates[0][0][0];
      console.log(firstPoint);
      // coords are lng / Lat
      const deltaLat = firstPoint[1] - this.marker.lat,
        deltaLong = firstPoint[0] - this.marker.lng;
      console.log(deltaLat, deltaLong);
      geojson.features[0].geometry.coordinates[0].forEach(polygon => {
        polygon.forEach(coord => {
          coord[0] -= deltaLong;
          coord[1] -= deltaLat;
        });
      });
      return geojson;
    }
  }
};
</script>