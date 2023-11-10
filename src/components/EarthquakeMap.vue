<!--
 * @Description: EarthquakeMap
 * @Author: Ian
 * @Date: 2023-11-10 23:12:07
 * @LastEditTime: 2023-11-11 00:18:04
 * @LastEditors: Ian
-->
<template>
  <div>
    <GoogleMap
      :center="center"
      :zoom="zoom"
      style="height: 100vh"
      api-key="AIzaSyCq0ly-OWfUdRdPqr4p3xQdgtVODEvCBkM"
    >
      <Marker
        v-for="(earthquake, index) in earthquakes"
        :key="index"
        :options="{ position: { lat: earthquake.lat, lng: earthquake.lng } }"
        @click="showDetails(earthquake)"
      />
    </GoogleMap>
  </div>
</template>

<script>
import { ref } from "vue";
import { GoogleMap, Marker, CustomControl } from "vue3-google-map";

export default {
  name: "EarthquakeMap",
  props: ["earthquakes"],
  components: { GoogleMap, Marker },
  data() {
    return {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    };
  },
  methods: {
    showDetails(earthquake) {
      console.log("earthquake", earthquake);
      this.$emit("show-details", earthquake);
    },
  },
};
</script>

<style scoped></style>
