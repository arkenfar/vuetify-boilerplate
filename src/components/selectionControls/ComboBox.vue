<template>
  <v-combobox
    v-model="items"
    :items="items"
    :label="$attrs.label ? $attrs.label : label"
    :hint="$attrs.hint ? $attrs.hint : hint"
    :counter="$attrs.counter ? $attrs.counter : counter"
    :clearable="$attrs.clearable ? $attrs.clearable : clearable"
    :multiple="$attrs.multiple ? $attrs.multiple : multiple"
    :chips="$attrs.chips ? $attrs.chips : chips"
    :deletable-chips="$attrs.deletableChips ? $attrs.deletableChips : deletableChips"
    :rules="[maxRules, minRules]"
  ></v-combobox>
</template>
<script>
export default {
  name: "ComboBox",
  props: ["defaultComboBoxItems", "maxComboBoxItems", "minComboBoxItems"],
  data() {
    return {
      label: "Combo Box",
      hint: "Comboboxes can receive custom values not present in items",
      counter: false,
      clearable: false,
      multiple: true,
      chips: true,
      deletableChips: true
    };
  },
  computed: {
    items: {
      get() {
        return this.defaultComboBoxItems;
      },
      set(value) {
        this.$emit("update:defaultComboBoxItems", value);
      }
    }
  },
  methods: {
    maxRules(val) {
      if (val.length > this.maxComboBoxItems) {
        let msg = "Selected items exceeded maximum number allowed items";
        return msg;
      } else {
        return true;
      }
    },
    minRules(val) {
      if (val.length < this.minComboBoxItems) {
        let msg =
          "You must at least select " +
          this.minComboBoxItems +
          " " +
          this.$attrs.name;

        return msg;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped></style>