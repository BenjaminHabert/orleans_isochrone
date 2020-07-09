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
      <l-control class="legend" style="width: 250px;">
        <p>
          Cette carte montre le
          <b>temps de trajet en transports en commun</b> (et à pied) pour
          <b>Orléans</b>. Déplacez le point de départ représenté par le marqueur.
          <a
            href="https://github.com/BenjaminHabert/orleans_isochrone#orleans-isochrone"
          >Détails</a>
        </p>

        <div>
          <label for="select-day">Jour de départ:</label>
          <select id="select-day" v-model="selectedDay">
            <option
              v-for="day in parameterConfig.possibleDays"
              :value="day[0]"
              :key="day[0]"
            >{{ day[1] }}</option>
          </select>
        </div>

        <div>
          <label for="select-hour">Heure de départ:</label>
          <select id="select-hour" v-model="selectedHour">
            <option
              v-for="hour in parameterConfig.possibleHours"
              :value="hour[0]"
              :key="hour[0]"
            >{{ hour[1] }}</option>
          </select>
        </div>

        <div id="example-3">
          <input type="checkbox" value="foot" checked="true" disabled="true" />
          <label for="foot">à pied</label>
          <input type="checkbox" id="bus" v-model="useBus" />
          <label for="bus">bus</label>
          <input type="checkbox" id="tram" v-model="useTram" />
          <label for="tram">tram</label>
          <br />
          <br />
        </div>

        <div style="display:grid">
          <div
            v-for="duration in parameterConfig.durations"
            :key="duration.minutes"
            style="display: inline-flex;align-items: baseline;"
          >
            <div :style="'margin:5px;width:20px;height:10px;background-color:' + duration.color"></div>
            {{duration.minutes}} min
          </div>
        </div>
      </l-control>

      <l-marker :lat-lng.sync="marker" :draggable="true" @dragend="innerClick">
        <l-tooltip :options="{ interactive: true }">
          <div>Déplacez le point de départ</div>
        </l-tooltip>
      </l-marker>

      <Isochrone
        :lat="marker.lat"
        :lng="marker.lng"
        :marker="marker"
        :day="selectedDay"
        :hour="selectedHour"
        :useBus="useBus"
        :useTram="useTram"
      />

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
import { parameterConfig } from "@/services/isochrone.js";

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

      parameterConfig: parameterConfig,
      selectedDay: parameterConfig.possibleDays[0][0],
      selectedHour: parameterConfig.possibleHours[0][0],
      useBus: true,
      useTram: true
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

  text-align: left;
}
</style>