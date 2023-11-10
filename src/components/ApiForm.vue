<template>
  <div class="flex justify-content-center">
    <Dialog
      v-model:visible="visible"
      modal
      :closable="false"
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      header="Insert your API KEY"
    >
      <div class="flex flex-column px-8 py-5 gap-4" style="border-radius: 12px">
        <Image
          width="35"
          height="40"
          fill="none"
          src="https://cdn-icons-png.flaticon.com/512/12/12139.png"
          class="block mx-auto"
        >
        </Image>
        <div class="inline-flex flex-column gap-2">
          <label for="api" class="font-semibold">API KEY</label>
          <InputText
            id="api"
            class="p-3"
            v-model="apiKey"
            :class="!apiKey ? 'p-invalid' : ''"
          ></InputText>
        </div>
        <div class="flex align-items-center gap-2">
          <Button
            label="Proceed"
            @click="handleProceed"
            class="p-3 w-full border-1"
          ></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref, computed, watch, inject } from "vue";
import { useStore } from "vuex";
export default {
  name: "Converter",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const apiKey = ref(null);
    const visible = ref(true);
    const store = useStore();
    const API_KEY = computed(() => store.state.API_KEY);

    function handleProceed() {
      console.log("piKey.value", apiKey.value);
      store.commit("ADD_API_KEY", apiKey.value);
    }
    // Watch the currencyList property in the store
    watch(
      () => store.state.API_KEY,
      (newValue) => {
        console.log("newValue", newValue);
        visible.value = false;
        apiKey.value = newValue; // Update currencyList with the new value from the store
      }
    );

    return {
      API_KEY,
      visible,
      handleProceed,
      apiKey,
    };
  },
};
</script>
