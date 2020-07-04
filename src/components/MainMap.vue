<template>
  <div style="height: 100vh; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-control class="legend">
        <p>
          Cette carte montre le
          <b>temps de trajet en transports en commun pour Orléans</b>. Déplacez le point de départ représenté par le marqueur.
        </p>

        <div>
          <label for="select-day">Jour de départ:</label>
          <select id="select-day" v-model="selectedDay">
            <option>Lundi - Vendredi</option>
            <option>Samedi</option>
            <option>Dimanche</option>
          </select>
        </div>

        <div>
          <label for="select-hour">Heure de départ:</label>
          <select id="select-hour" v-model="selectedHour">
            <option>8h</option>
            <option>13h</option>
            <option>17h</option>
            <option>20h</option>
            <option>23h</option>
          </select>
        </div>
      </l-control>

      <l-marker :lat-lng.sync="marker" :draggable="true" @dragend="innerClick">
        <l-tooltip :options="{ interactive: true }">
          <div>Déplacez le point de départ</div>
        </l-tooltip>
      </l-marker>

      <Isochrone :marker="marker" />

      <Debug
        :marker="marker"
        :currentZoom="currentZoom"
        :currentCenter="currentCenter"
        :selectedDay="selectedDay"
        :selectedHour="selectedHour"
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LTooltip, LControl } from "vue2-leaflet";

import Debug from "./Debug.vue";
import Isochrone from "./Isochrone.vue";

export default {
  name: "MainMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControl,

    Debug,
    Isochrone
  },
  data() {
    return {
      zoom: 13,
      center: latLng(47.910244, 1.907501),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.910244, 1.907501),
      currentZoom: 11.5,
      currentCenter: latLng(47.910244, 1.907501),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,

      selectedDay: "Lundi - Vendredi",
      selectedHour: "8h"
    };
  },

  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      // alert("Click!");
    }
  }
};
</script>


<style>
.legend {
  background: #fff;
  padding: 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
  width: 300px;
  text-align: left;
}
</style>