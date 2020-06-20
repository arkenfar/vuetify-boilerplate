<template>
  <v-container fluid>
    <v-tabs grow :vertical="$vuetify.breakpoint.mdAndUp">
      <v-row no-gutters justify-md="start" justify-sm="center" align="start">
        <v-col cols="12" xs="12">
          <v-row>
            <v-tab>
              <v-icon left>mdi-developer-board</v-icon>My Boards
            </v-tab>
          </v-row>
          <v-row>
            <v-tab>
              <v-icon left>mdi-plus</v-icon>New Board
            </v-tab>
          </v-row>
        </v-col>
      </v-row>

      <v-tab-item v-if="!loading">
        <v-container>
          <v-row>
            <v-col cols="12">
              <MyBoards></MyBoards>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <NewBoard :showButtons="true"></NewBoard>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import NewBoard from "./NewBoard";
import MyBoards from "./MyBoards";

export default {
  name: "Boards",
  components: { NewBoard, MyBoards },
  data() {
    return {
      name: "Boards"
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