<!--
 * @Description: Home
 * @Author: Ian
 * @Date: 2023-11-10 23:10:41
 * @LastEditTime: 2023-11-11 01:39:44
 * @LastEditors: Ian
-->
<template>
  <div>
    <APIForm :handleApi="handleGetAPI" :API_KEY="API_KEY" v-if="!API_KEY" />
    <div class="grid grid-nogutter" v-if="API_KEY">
      <div :class="getGridColumnClass(9)">
        <EarthquakeMap :earthquakes="earthquakes" @show-details="showDetails" />
      </div>
      <Transition :duration="550" name="nested">
        <div
          class="auto-scroll"
          :class="getGridColumnClass(3)"
          v-if="selectedEarthquake !== null"
          ref="detailsContainer"
          :style="{ padding: selectedEarthquake !== null ? '10px' : '0' }"
        >
          <EarthquakeDetails
            :selectedEarthquake="selectedEarthquake"
            @close="handleClose"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EarthquakeMap from "../components/EarthquakeMap.vue";
import EarthquakeDetails from "../components/EarthquakeDetails.vue";
import APIForm from "../components/ApiForm.vue";
import { ref, computed, watch, inject } from "vue";
export default {
  name: "Home",
  setup(props, context) {
    const store = inject("store");
    const API_KEY = computed(() => store.state.API_KEY);

    return {
      API_KEY,
    };
  },
  data() {
    return {
      earthquakes: [],
      selectedEarthquake: null,
    };
  },
  methods: {
    async fetchEarthquakes() {
      try {
        const response = await axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        this.earthquakes = response.data.features.map((feature) => ({
          place: feature.properties.place,
          date: new Date(feature.properties.time).toLocaleString(),
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          url: feature.properties.url,
        }));
      } catch (error) {
        console.error(error);
      }
    },

    showDetails(earthquake) {
      this.selectedEarthquake = earthquake;
      this.show = true;
      if (this.$mq && (this.$mq.screen === "sm" || this.$mq.screen === "xs")) {
        this.$nextTick(() => this.scrollToBottom());
      }
    },

    handleClose() {
      this.selectedEarthquake = null;
    },

    getGridValue(value) {
      return this.selectedEarthquake !== null ? value : 12;
    },

    getGridColumnClass(value) {
      return {
        "col-12": true,
        "sm:col-12": true,
        [`md:col-${this.getGridValue(value)}`]: true,
        [`lg:col-${this.getGridValue(value)}`]: true,
      };
    },

    scrollToBottom() {
      if (this.$refs.detailsContainer) {
        this.$refs.detailsContainer.$el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  },

  components: {
    EarthquakeMap,
    EarthquakeDetails,
    APIForm,
  },

  created() {
    this.fetchEarthquakes();
  },
};
</script>

<style>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>
