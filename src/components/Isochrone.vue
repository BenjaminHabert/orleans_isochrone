<template>
  <div>
    <l-geo-json :geojson="geojson"></l-geo-json>
  </div>
</template>



<script>
import { LGeoJson } from "vue2-leaflet";

import { getIsochrone } from "@/services/isochrone.js";

export default {
  name: "Isochrone",
  components: {
    LGeoJson
  },
  props: ["lat", "lng", "marker"],
  data() {
    return {
      geojson: null
    };
  },
  created() {
    this.updateIsochrone();
  },
  watch: {
    marker: function() {
      this.updateIsochrone();
    }
  },
  methods: {
    updateIsochrone() {
      getIsochrone(this.marker.lat, this.marker.lng).then(
        data => (this.geojson = data.polygons)
      );
    }
  }
};
</script>