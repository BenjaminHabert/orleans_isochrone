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
  props: ["lat", "lng", "marker", "day", "hour"],
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
    },
    day: function() {
      this.updateIsochrone();
    },
    hour: function() {
      this.updateIsochrone();
    }
  },
  methods: {
    updateIsochrone() {
      getIsochrone(this.marker.lat, this.marker.lng, this.day, this.hour).then(
        data => {
          this.geojson = data.polygons;
        }
      );
    }
  }
};
</script>