<template >
  <l-control class="legend" position="bottomright" v-show="false">
    <p>Debug</p>
    <p>First marker is placed at {{ marker.lat }}, {{ marker.lng }}</p>
    <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
    <p>
      <span>Jour : {{ selectedDay }}</span>
      <span>. Heure : {{ selectedHour }}</span>
    </p>
  </l-control>
</template>

<script>
import { LControl } from "vue2-leaflet";

export default {
  name: "Debug",
  components: {
    LControl
  },
  props: [
    "marker",
    "currentCenter",
    "currentZoom",
    "selectedDay",
    "selectedHour"
  ]
};
</script>

