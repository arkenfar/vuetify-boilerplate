<template>
  <div>
    <v-card flat v-if="goals.length < 1">
      <v-container fluid>
        <v-row no-gutters justify="center" align="start">
          <v-col cols="12" xs="12">
            <v-card-title>You dont seem to have any goals!</v-card-title>
            <v-card-subtitle>Try creating one</v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card flat>
      <v-container fluid>
        <v-row no-gutters justify="start" align="start">
          <v-col cols="4" xs="4" v-for="g in goals" :key="g.name">
            <Goal :goal="g"></Goal>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import Goal from "./Goal";
export default {
  name: "MyGoals",
  components: { Goal },
  data() {
    return {
      name: "MyGoals"
    };
  },
  computed: {
    goals() {
      return this.$store.getters["goals/goals"];
    }
  },
  mounted() {
    this.loadGoals();
  },
  methods: {
    setLoading(value) {
      this.$store.dispatch("loading/setLoading", value);
    },
    setError(value) {
      this.$store.dispatch("error/setError", value);
    },
    loadAbout() {
      this.setLoading(true);
      this.$store.dispatch("about/loadAbout");
      this.setLoading(false);
    },
    loadGoals() {
      this.$store.dispatch("goals/loadGoals");
    }
  }
};
</script>