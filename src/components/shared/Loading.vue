<template>
  <v-progress-circular
    indeterminate
    class="primary--text"
    :width="$attrs.width"
    :size="$attrs.size"
    v-if="loading"
  ></v-progress-circular>
</template>
<script>
export default {
  name: "Loading",
  props: ["loading"]
};
</script>
