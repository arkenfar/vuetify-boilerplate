<template>
  <v-container>
    <v-row>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on }">
          <v-card :hover="true" class="mx-auto">
            <v-row justify="center">
              <v-col cols="12" xs="12">
                <v-card-title>{{ board.title }}</v-card-title>
                <p class="col-12 text-truncate">{{ board.description }}</p>
              </v-col>
            </v-row>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-row justify="center" align-content="center">
              <v-btn
                class="mb-2"
                color="primary"
                width="6rem"
                dark
                v-on="on"
                @click="openBoard"
                >Open</v-btn
              >
            </v-row>
          </v-card>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="closeBoard">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ board.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="saveBoard">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-container>
            <v-row>
              <v-col cols="12" xs="12">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Board description</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-textarea
                        dense
                        :row-height="2"
                        :value="board.description"
                      ></v-textarea>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

                <v-container fluid>
                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12" xs="12">
                      <v-row justify="center" align="stretch">
                        <Stages :stages="board.stages"></Stages>
                        <!-- Second try -->
                        <!-- <v-col
                          cols="3"
                          v-for="(stage, index) in board.stages"
                          :key="index"
                          @dragover.prevent
                          @drop="dragFinish($event)"
                        >
                          <v-card style="min-height: 500px; min-width: 150px;">
                            <v-row justify="center">
                              <v-card-title>{{stage}}</v-card-title>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <template v-for="task in boardTasks">
                                <v-card
                                  :key="task.uid"
                                  :id="task.uid"
                                  :draggable="true"
                                  @dragover.prevent
                                  @dragstart="dragStart($event)"
                                  @dragend="dragEnd"
                                  @drop="dragFinish($event)"
                                >
                                  <Task :task="task"></Task>
                                </v-card>
                              </template>
                            </v-row>
                          </v-card>
                        </v-col>-->

                        <!-- First try -->
                        <!-- <v-col cols="4">
                          <v-row>
                            <v-card style="height: 100%; width: 100%; padding: 5px;">
                              <v-row>
                                <v-card-title>Not started</v-card-title>
                              </v-row>
                              <Task v-for="task in boardTasks" :key="task.uid" :task="task"></Task>
                            </v-card>
                          </v-row>
                        </v-col>
                        <v-col cols="4">
                          <v-card style="height: 100%; width: 100%; padding: 5px;">
                            <v-container>
                              <v-row>
                                <v-row>
                                  <v-card-title>Doing</v-card-title>
                                </v-row>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-col>

                        <v-col cols="4">
                          <v-card style="height: 100%; width: 100%; padding: 5px;">
                            <v-card-title>Done</v-card-title>
                          </v-card>
                        </v-col>-->
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <div class="overlay">
              <v-overlay
                :value="overlay"
                :dark="darkMode"
                :fullscreen="$vuetify.breakpoint.smAndDown"
              >
                <v-card
                  class="overlay"
                  :hover="true"
                  outlined
                  max-width="80vw"
                  max-height="80vh"
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
                    <v-btn icon @click="onConfirmSave" color="success">
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                    <v-btn icon @click="onCancelSave" color="error">
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
                      <span>Tasks</span>
                      <v-icon>mdi-file-outline</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(menu, index) in taskMenu"
                      :key="index"
                      @click="menu.action"
                    >
                      <v-list-item-title>{{ menu.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-menu top :offset-y="true">
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on">
                      <span>Stages</span>
                      <v-icon>mdi-drag-vertical-variant</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(menu, index) in stagesMenu"
                      :key="index"
                      @click="menu.action"
                    >
                      <v-list-item-title>{{ menu.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-btn @click="deleteBoard">
                  <span>Delete board</span>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-bottom-navigation>
            </v-footer>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import NewTask from "../tasks/NewTask";
import MyTasks from "../tasks/MyTasks";
// import Task from "../tasks/Task";
import Stages from "../boards/Stages";
export default {
  name: "Board",
  components: { NewTask, MyTasks, Stages },
  props: {
    board: Object,
    default() {
      return {};
    },
  },
  data() {
    return {
      name: "Board",
      newTaskFormData: null,
      dialog: false,
      activeBottomBtn: null,
      overlay: false,
      overlayIs: undefined,
      overlayText: "",
      dragging: -1,
      stagesMenu: [
        { title: "Create new stage", action: this.newStage },

        { title: "Delete stage", action: this.deleteStage },
      ],
      taskMenu: [
        { title: "Create new task", action: this.newTask },
        { title: "Available tasks", action: this.availableTasks },
        { title: "Delete task", action: this.deleteTask },
      ],
    };
  },
  computed: {
    isDragging() {
      return this.dragging > -1;
    },
    darkMode() {
      return this.$store.getters["settings/darkMode"];
    },
    currentBoard() {
      return this.$store.getters["board/board"];
    },
    boardTasks() {
      return this.$store.getters["board/boardTasks"];
    },
  },
  mounted() {},
  methods: {
    dragStart(ev) {
      ev.currentTarget.style.border = "dashed";
      ev.dataTransfer.setData("Text", ev.target.id);
      ev.dataTransfer.dropEffect = "move";
    },
    dragEnd() {
      this.dragging = -1;
    },
    dragFinish(ev) {
      console.log(ev);
      var task = ev.dataTransfer.getData("text");
      this.changeTaskStatus(task, ev.target);
      ev.target.style.marginTop = "2px";
      ev.target.style.marginBottom = "2px";
    },
    loadBoard() {
      this.$store.dispatch("board/loadBoard", { board: this.board.uid });
    },
    loadBoardTasks() {
      this.$store.dispatch("board/loadBoardTasks", { board: this.board.uid });
    },
    closeBoard() {
      this.$store.dispatch("board/clearBoard");
      this.dialog = false;
    },
    openBoard() {
      this.loadBoard();
      this.loadBoardTasks();
    },
    saveBoard() {
      this.$store.dispatch("board/clearBoard");
      this.dialog = false;
    },
    newTask() {
      this.overlay = true;
      this.overlayIs = 1;
      this.overlayText =
        "Create a new task and link it to '" + this.board.title + "'";
    },
    deleteTask() {
      this.overlay = true;
      this.overlayIs = 2;
      this.overlayText = "Delete marked task?";
    },
    changeTaskStatus() {},
    deleteBoard() {
      this.overlay = true;
      this.overlayIs = 3;
      this.overlayText = "Delete current board? '" + this.board.title + "'";
    },
    newStage() {
      this.overlay = true;
      this.overlayIs = 4;
      this.overlayText =
        "Create a new stage for board '" + this.board.title + "'";
    },
    deleteStage() {
      this.overlay = true;
      this.overlayIs = 5;
      this.overlayText = "Delete marked stage?";
    },
    availableTasks() {
      this.overlay = true;
      this.overlayIs = 6;
      this.overlayText = "Available Tasks";
    },
    onConfirmSave() {
      switch (this.overlayIs) {
        case 1:
          console.log(
            "Create Task:",
            this.newTaskFormData,
            "For Board:",
            this.board
          );
          this.$store.dispatch("boards/newBoardTask", {
            task: this.newTaskFormData,
            board: this.board.uid,
          });
          this.overlay = false;
          break;
        case 2:
          console.log("Delete task");
          this.overlay = false;
          break;
        case 3:
          console.log("Delete board");
          this.$store.dispatch("board/deleteBoard", { board: this.board.uid });
          this.dialog = false;
          this.overlay = false;
          break;
        case 4:
          console.log("Add stage");
          this.overlay = false;
          break;
        case 5:
          console.log("Delete stage");
          this.overlay = false;
          break;
        case 6:
          console.log("Available tasks");
          this.overlay = false;
          break;
        default:
          console.log("default");
          this.overlay = false;
          break;
      }
    },
    onCancelSave() {
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
