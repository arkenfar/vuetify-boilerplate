<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card flat v-if="boards.length < 1">
            <v-row no-gutters justify="center" align="start">
              <v-col cols="12" xs="12">
                <v-card-title>You dont seem to have any boards!</v-card-title>
                <v-card-subtitle>Try creating one</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
          <v-card flat v-if="boards.length >= 1">
            <v-row no-gutters justify="center" align="start">
              <v-col cols="12" xs="12">
                <div class="board" v-for="b in boards" :key="b.name">
                  <Board :board="b"></Board>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Board from "./Board";
export default {
  name: "MyBoards",
  components: { Board },
  data() {
    return {
      name: "MyBoards",
    };
  },
  computed: {
    boards() {
      return this.$store.getters["boards/boards"];
    },
  },
  mounted() {
    this.loadBoards();
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
    loadBoards() {
      this.$store.dispatch("boards/loadBoards");
    },
  },
};
</script>
