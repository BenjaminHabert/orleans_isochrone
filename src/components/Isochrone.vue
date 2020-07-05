<template>
  <div v-if="geojson">
    <l-geo-json v-for="(polygons, i) in geojson" :key="i" :geojson="polygons"></l-geo-json>
  </div>
</template>



<script>
import { LGeoJson } from "vue2-leaflet";

import { getIsochrones } from "@/services/isochrone.js";

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
      getIsochrones(
        this.marker.lat,
        this.marker.lng,
        this.day,
        this.hour
        // 1000
      ).then(data => {
        console.log(data);
        this.geojson = data;
      });
    }
  }
};
</script>