<template>
  <v-alert close-text="Close Alert" type="error" dismissible @input="onClose">
    {{ errorMsg }}
  </v-alert>
</template>

<script>
export default {
  props: ["errorMsg"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>
