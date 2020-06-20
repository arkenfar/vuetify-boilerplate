<template>
  <v-container fluid>
    <v-tabs grow :vertical="$vuetify.breakpoint.mdAndUp">
      <v-row no-gutters justify-md="start" justify-sm="center" align="start">
        <v-col cols="12" xs="12">
          <v-row>
            <v-tab>
              <v-icon left>mdi-trophy</v-icon>My Goals
            </v-tab>
          </v-row>
          <v-row>
            <v-tab>
              <v-icon left>mdi-plus</v-icon>New Goal
            </v-tab>
          </v-row>
        </v-col>
      </v-row>

      <v-tab-item v-if="!loading">
        <MyGoals></MyGoals>
      </v-tab-item>
      <v-tab-item>
        <NewGoal></NewGoal>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import NewGoal from "./NewGoal";
import MyGoals from "./MyGoals";

export default {
  name: "Goals",
  components: { NewGoal, MyGoals },
  data() {
    return {
      name: "Goals"
    };
  },
  computed: {
    loading() {
      return this.$store.getters["loading/loading"];
    },
    error() {
      return this.$store.getters["error/error"];
    }
  },

  methods: {}
};
</script>
<style scoped>
.width-height-full {
  height: 100%;
  width: 100%;
}
</style>