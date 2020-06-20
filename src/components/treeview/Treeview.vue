<template>
  <v-container fluid>
    <v-row v-if="loading" justify="space-around" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <v-row v-if="!loading" justify="center" align="stretch">
      <v-card flat>
        <v-container fluid>
          <v-row no-gutters justify="center" align="stretch">
            <v-col cols="12" xs="12">
              <v-treeview></v-treeview>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>


<script>
import Loading from "../shared/Loading";

export default {
  name: "Treeview",
  components: { Loading },
  data() {
    return {
      name: "Treeview"
    };
  },
  computed: {
    loading() {
      return this.$store.getters["loading/loading"];
    }
  },

  methods: {
    setLoading(value) {
      this.$store.dispatch("loading/setLoading", value);
    }
  }
};
</script>

<style scoped>
</style>
