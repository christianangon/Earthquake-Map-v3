<template>
  <div class="flex justify-content-center">
    <Toast />
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
import { ref, computed, watch, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
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
    const toast = useToast();
    function handleProceed() {
      // Regular expression for validating the API key format
      const apiKeyRegex = /^[A-Za-z0-9]{11}-[A-Za-z0-9-_]{27}$/;

      // Check if apiKey is valid based on format and length
      if (apiKeyRegex.test(apiKey.value)) {
        setTimeout(() => {
          // Show toast for a valid API key
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "API Key is valid. Proceeding...",
            life: 3000,
          });

          // Commit API key to store
          store.commit("ADD_API_KEY", apiKey.value);
          localStorage.setItem("API_KEY", apiKey.value);
        }, 1000);
      } else {
        // Show toast for an invalid API key
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Invalid API Key. Please check the format and length.",
          life: 5000,
        });
      }
    }

    onMounted(() => {
      if (localStorage.getItem("API_KEY")) {
        const api = localStorage.getItem("API_KEY");
        apiKey.value = api;
        store.commit("ADD_API_KEY", api);
      }
    });

    // Watch the API_KEY property in the store
    watch(
      () => store.state.API_KEY,
      (newValue) => {
        visible.value = false;
        apiKey.value = newValue; // Update API_KEY with the new value from the store
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
