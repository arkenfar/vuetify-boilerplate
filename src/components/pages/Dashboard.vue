<template>
  <v-container fluid>
    <v-row v-if="loading" justify="space-around" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <Error v-if="error" :errorMsg="error"></Error>

    <v-tabs
      :grow="true"
      v-model="tab"
      show-arrows
      align-with-title
      centered
      center-active
      hide-slider
      v-if="!loading"
    >
      <v-tab>Tasks</v-tab>
      <v-tab>Boards</v-tab>
      <v-tab>Goals</v-tab>
      <v-tab>Calendar</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="width-height-full" v-if="!loading">
      <v-tab-item>
        <v-container fluid id="container-tab-content">
          <v-row justify="center" align="stretch" no-gutters>
            <v-col cols="12" xs="12">
              <Tasks></Tasks>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid id="container-tab-content">
          <v-row justify="center" align="stretch" no-gutters>
            <v-col cols="12" xs="12">
              <Boards></Boards>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid id="container-tab-content">
          <v-row justify="center" align="stretch" no-gutters>
            <v-col cols="12" xs="12">
              <Goals></Goals>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid id="container-tab-content">
          <v-row justify="center" align="stretch" no-gutters>
            <v-col cols="12" xs="12">
              <div>Calendar component</div>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Loading from "../shared/Loading";
import Boards from "../boards/Boards";
import Tasks from "../tasks/Tasks";
import Goals from "../goals/Goals";

export default {
  name: "Dashboard",
  components: { Loading, Boards, Tasks, Goals },
  data() {
    return {
      name: "Dashboard",
      tab: null,
    };
  },
  computed: {
    loading() {
      return this.$store.getters["loading/loading"];
    },
    error() {
      return this.$store.getters["error/error"];
    },
  },

  methods: {
    setLoading(value) {
      this.$store.dispatch("loading/setLoading", value);
    },
    setError(value) {
      this.$store.dispatch("error/setError", value);
    },
  },
};
</script>

<style scoped>
.width-height-full {
  height: 100%;
  width: 100%;
}
</style>
