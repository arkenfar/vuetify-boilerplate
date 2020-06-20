<template>
  <v-alert close-text="Close Alert" type="warning" dismissible @input="onClose">{{ warningMsg }}</v-alert>
</template>

<script>
export default {
  props: ["warningMsg"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>
