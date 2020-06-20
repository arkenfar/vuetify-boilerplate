<template>
  <v-container>
    <v-row v-if="loading" justify="center" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <v-row v-else justify="center" align="center">
      <v-col cols="1" xs="1">{{ name }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loading from "../shared/Loading";
export default {
  name: "Home",
  components: { Loading },
  data() {
    return {
      name: "Home",
      loading: false
    };
  },
  computed: {},

  mounted() {}
};
</script>

<style lang="scss" scoped></style>
