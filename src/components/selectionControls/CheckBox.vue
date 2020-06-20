<template>
  <v-checkbox
    v-model="checked"
    :label="$attrs.label ? $attrs.label : label"
    :hint="$attrs.hint ? $attrs.hint : hint"
  ></v-checkbox>
</template>
<script>
export default {
  name: "CheckBox",
  props: ["checkBoxValue"],
  data() {
    return {
      label: "Check Box",
      hint: "Click to change between 'true' or 'false'"
    };
  },
  computed: {
    checked: {
      get() {
        return this.checkBoxValue;
      },
      set(value) {
        this.$emit("update:checkBoxValue", value);
      }
    }
  }
};
</script>

<style scoped></style>