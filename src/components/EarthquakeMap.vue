<!--
 * @Description: EarthquakeMap
 * @Author: Ian
 * @Date: 2023-11-10 23:12:07
 * @LastEditTime: 2023-11-11 01:32:01
 * @LastEditors: Ian
-->
<template>
  <div>
    <GoogleMap
      v-if="API_KEY"
      :center="center"
      :zoom="zoom"
      style="height: 100vh"
      :api-key="API_KEY"
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
  computed: {
    API_KEY() {
      return this.$store.state.API_KEY;
    },
  },
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
    handleGetAPI(api) {
      this.API_KEY = api;
    },
  },
};
</script>

<style scoped></style>
