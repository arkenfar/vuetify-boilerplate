<template>
  <v-alert close-text="Close Alert" type="info" dismissible @input="onClose">{{ infoMsg }}</v-alert>
</template>

<script>
export default {
  props: ["infoMsg"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>
