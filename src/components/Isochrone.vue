<template>
  <div>
    <div v-if="geojson">
      <l-geo-json v-for="(polygons, i) in geojson" :key="i" :geojson="polygons"></l-geo-json>
    </div>

    <l-control v-show="loading" class="legend" position="bottomleft">
      <div class="lds-dual-ring"></div>
    </l-control>
  </div>
</template>



<script>
import { LGeoJson, LControl } from "vue2-leaflet";

import { getIsochrones } from "@/services/isochrone.js";

export default {
  name: "Isochrone",
  components: {
    LGeoJson,
    LControl
  },
  props: ["lat", "lng", "marker", "day", "hour"],
  data() {
    return {
      geojson: null,
      loading: true
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
      //   this.geojson = null;
      this.loading = true;
      getIsochrones(this.marker.lat, this.marker.lng, this.day, this.hour).then(
        data => {
          console.log(data);
          this.geojson = data;
          this.loading = false;
        }
      );
    }
  }
};
</script>


<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 1em;
  margin-right: 1em;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #8691a3;
  border-color: #8691a3 transparent #8691a3 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>