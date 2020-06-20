<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" xs="12">
        <v-tabs grow :vertical="$vuetify.breakpoint.mdAndUp">
          <v-row
            no-gutters
            justify-md="start"
            justify-sm="center"
            align="start"
          >
            <v-col cols="12" sm="3" md="6">
              <v-row>
                <v-tab> <v-icon left>mdi-file-multiple</v-icon>My Tasks </v-tab>
              </v-row>
              <v-row>
                <v-tab> <v-icon left>mdi-plus</v-icon>New Task </v-tab>
              </v-row>
              <v-row>
                <v-tab> <v-icon left>mdi-delete</v-icon>Delete Tasks </v-tab>
              </v-row>
            </v-col>
          </v-row>

          <v-tab-item v-if="!loading">
            <MyTasks :showOpenButton="true" :showDeleteButton="false"></MyTasks>
          </v-tab-item>
          <v-tab-item>
            <NewTask :showButtons="true"></NewTask>
          </v-tab-item>
          <v-tab-item v-if="!loading">
            <MyTasks :showDeleteButton="true" :showOpenButton="false"></MyTasks>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import NewTask from "./NewTask";
import MyTasks from "./MyTasks";

export default {
  name: "Tasks",
  components: { NewTask, MyTasks },
  data() {
    return {
      name: "Tasks",
      overlay: false,
      overlayIs: undefined,
      overlayText: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters["loading/loading"];
    },
    error() {
      return this.$store.getters["error/error"];
    },
    darkMode() {
      return this.$store.getters["settings/darkMode"];
    },
  },
  mounted() {},
  methods: {
    onDeleteTasks() {
      this.overlay = true;
    },
    onConfirmSave() {
      console.log("on confirm save");
      this.overlay = false;
    },

    onCancelSave() {
      console.log("on cancel save");
      this.overlay = false;
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
