<template>
  <v-container fluid>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" xs="12">
        <div class="task-container">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-card :hover="true" class="task-content mx-auto">
                <v-row no-gutters align="start" justify="center">
                  <v-col cols="12" xs="12">
                    <v-row no-gutters justify="center" align="start">
                      <v-card-text class="title text-truncate">
                        {{ task.title }}
                      </v-card-text>
                      <v-spacer></v-spacer>
                      <v-card-text class="text-truncate">
                        {{ task.created }}
                      </v-card-text>
                    </v-row>
                    <v-row no-gutters justify="center" align="start">
                      <v-card-text class="text-truncate">
                        {{ task.description }}
                      </v-card-text>
                    </v-row>
                    <v-row justify="center" align="start" v-if="showOpenButton">
                      <v-btn
                        class="mb-3 mt-2"
                        color="primary"
                        dark
                        v-on="on"
                        @click="openTask"
                        small
                        >Open</v-btn
                      >
                    </v-row>
                    <v-row
                      justify="center"
                      align="start"
                      v-if="showDeleteButton"
                    >
                      <v-btn
                        class="mb-3 mt-2"
                        color="error"
                        dark
                        small
                        @click="onDeleteTask"
                        >Delete</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeTask">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <!-- <v-toolbar-title>
                  {{
                  task.title
                  }}
                </v-toolbar-title>-->

                <TextInput
                  class="mt-6"
                  :textValue.sync="task.title"
                  :singleLine="true"
                  :solo="true"
                  :flat="true"
                  :soloInverted="true"
                  name="Task title"
                  label="Task title"
                ></TextInput>

                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="saveTask">Save</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-container>
                <v-row>
                  <v-col cols="12" xs="12">
                    <v-textarea
                      dense
                      :row-height="10"
                      v-model="task.description"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <div class="overlay">
                  <v-overlay :value="overlay" :dark="darkMode">
                    <v-card
                      class="overlay"
                      :hover="true"
                      outlined
                      width="40rem"
                    >
                      <v-row justify="center" align="start" no-gutters>
                        <v-col cols="10" xs="10">
                          <blockquote
                            class="blockquote subtitle-1 font-weight-medium text-center"
                          >
                            {{ overlayText }}
                          </blockquote>
                          <NewTask
                            v-if="overlayIs == 1"
                            :showButtons="false"
                            :value.sync="newTaskFormData"
                          ></NewTask>
                          <MyTasks v-if="overlayIs == 6"></MyTasks>
                          <div v-if="overlayIs == 3">
                            Delete the current board that you are on
                          </div>
                        </v-col>
                      </v-row>
                      <v-divider />
                      <v-row justify="center" align="start" no-gutters>
                        <v-btn icon @click="onConfirmOverlay" color="success">
                          <v-icon>mdi-check</v-icon>
                        </v-btn>
                        <v-btn icon @click="onCancelOverlay" color="error">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-row>
                    </v-card>
                  </v-overlay>
                </div>
                <v-footer absolute>
                  <v-bottom-navigation grow color="primary" fixed>
                    <v-menu top :offset-y="true">
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on">
                          <span>Task</span>
                          <v-icon>mdi-file-outline</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(menu, index) in taskMenu"
                          :key="index"
                          @click="menu.action"
                        >
                          <v-list-item-title>{{
                            menu.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-menu top :offset-y="true">
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on">
                          <span>Boards</span>
                          <v-icon>mdi-developer-board</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(menu, index) in boardsMenu"
                          :key="index"
                          @click="menu.action"
                        >
                          <v-list-item-title>{{
                            menu.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-btn @click="deleteTask">
                      <span>Delete task</span>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                </v-footer>
              </v-container>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TextInput from "../inputs/TextInput";

export default {
  name: "Task",
  components: { TextInput },
  props: {
    task: Object,
    showOpenButton: Boolean,
    showDeleteButton: Boolean,
    default() {
      return {
        task: {},
        showOpenButton: true,
        showDeleteButton: false,
      };
    },
  },
  data() {
    return {
      name: "Task",
      dialog: false,
      overlay: false,
      overlayIs: undefined,
      overlayText: "",
      boardsMenu: [
        { title: "Linked boards", action: this.linkedBoards },

        { title: "Available boards", action: this.availableBoards },
      ],
      taskMenu: [
        { title: "Copy task", action: this.copyTask },
        { title: "Task settings", action: this.taskSettings },
      ],
    };
  },
  computed: {
    darkMode() {
      return this.$store.getters["settings/darkMode"];
    },
  },

  methods: {
    openTask() {
      this.loadTask();
    },
    loadTask() {
      this.$store.dispatch("task/loadTask", { task: this.task.uid });
    },
    closeTask() {
      this.$store.dispatch("task/clearTask");
      this.dialog = false;
    },
    saveTask() {
      this.$store.dispatch("task/updateTask", this.task);
      this.dialog = false;
    },
    linkedBoards() {
      this.overlay = true;
      this.overlayIs = 1;
      this.overlayText = "Boards linked to task '" + this.task.title + "'";
    },
    availableBoards() {
      this.overlay = true;
      this.overlayIs = 2;
      this.overlayText =
        "Available boards not linked to task '" + this.task.title + "'";
    },
    copyTask() {
      this.overlay = true;
      this.overlayIs = 3;
      this.overlayText = "Copy task '" + this.task.title + "'";
    },
    taskSettings() {
      this.overlay = true;
      this.overlayIs = 4;
      this.overlayText = "Settings for task '" + this.task.title + "'";
    },
    onDeleteTask() {
      console.log("delete task", this.task);
    },
    deleteTask() {
      this.overlay = true;
      this.overlayIs = 5;
      this.overlayText =
        "Are you sure you want to delete task '" + this.task.title + "'";
    },
    onConfirmOverlay() {
      switch (this.overlayIs) {
        case 1:
          console.log("Linked boards");
          this.overlay = false;
          break;
        case 2:
          console.log("Available boards");
          this.overlay = false;
          break;
        case 3:
          console.log("Copy task");
          this.dialog = false;
          this.overlay = false;
          break;
        case 4:
          console.log("Task settings");
          this.overlay = false;
          break;
        case 5:
          console.log("Delete task");
          this.overlay = false;
          break;
        default:
          console.log("default");
          this.overlay = false;
          break;
      }
    },
    onCancelOverlay() {
      this.overlay = false;
    },
  },
};
</script>
<style scoped>
/* .task-container {
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  max-width: 10vw;
  max-height: 10vh;
  text-align: center;
  display: table;
}
.task-content {
  width: 10vw;
  height: 10vh;
  min-height: 100%;
  min-width: 100%;
  max-width: 200px;
  max-height: 200px;
  display: table-cell;
  vertical-align: middle;
} */
</style>
