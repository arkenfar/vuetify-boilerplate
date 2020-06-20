<template>
  <v-alert close-text="Close Alert" type="success" dismissible @input="onClose">{{ successMsg }}</v-alert>
</template>

<script>
export default {
  props: ["successMsg"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>
