<template>
  <Card>
    <template #header>
      <img :src="source_image" class="image" />
    </template>
    <template #title>
      <a
        :href="selectedEarthquake ? selectedEarthquake.url : '#'"
        target="_blank"
        class="news_info"
      >
        <i class="pi pi-map-marker"></i>
        <span class="title">
          {{ selectedEarthquake ? selectedEarthquake.place : "" }}
        </span>
      </a>
    </template>
    <template #subtitle> Time and Date </template>
    <template #content>
      <div class="flex align-items-center">
        <i class="pi pi-calendar"></i>
        <p class="m-0">
          {{ selectedEarthquake ? selectedEarthquake.date : "" }}
        </p>
      </div>
    </template>
    <template #footer>
      <Button
        icon="pi pi-times"
        label="Close"
        class="p-text-right"
        severity="danger"
        @click="handleClose"
      />
    </template>
  </Card>
</template>

<script>
import { ref } from "vue";

export default {
  name: "EarthquakeDetails",
  props: ["selectedEarthquake"],
  setup(props, { emit }) {
    const source_image =
      "https://www.nsf.gov/news/mmg/media/images/global_seismicity_f.jpg";

    const handleClose = () => {
      emit("close");
    };

    return {
      source_image,
      handleClose,
    };
  },
};
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
  background-color: black;
}
.bottom {
  margin-top: 13px;
  margin-bottom: 20px;
  padding: 10px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.title {
  text-transform: capitalize;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
}
.subtitle {
  font-size: 18px;
  font-weight: bold;
}
.news_info {
  color: black;
}
</style>
