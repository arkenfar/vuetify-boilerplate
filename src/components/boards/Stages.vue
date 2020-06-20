<template>
  <grid-layout
    class="stages-grid"
    :layout.sync="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[10, 10]"
    :use-css-transforms="true"
  >
    <grid-item
      class="stage"
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      dragAllowFrom=".stage-title"
    >
      <p class="stage-title text-center">{{ item.i }}</p>
      <v-divider></v-divider>
      <draggable
        :id="item.i"
        class="list-group"
        :list="tasks"
        :options="{group:'tasks'}"
        :move="onMove"
        @add="onAdd"
        @change="log"
      >
        <!-- <transition-group> -->
        <template v-for="(task, index) in tasksList">
          <div
            class="list-group-item"
            v-if="task.status == item.i"
            :key="index"
          >{{ task.title }} {{ task.status }}</div>
        </template>

        <!-- </transition-group> -->
      </draggable>
    </grid-item>
  </grid-layout>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import draggable from "vuedraggable";

export default {
  name: "Stages",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    draggable
  },
  props: {
    stages: Array,
    default() {
      return [];
    }
  },

  data() {
    return {
      name: "Stages",
      layout: this.setStageLayout(),
      tasks: [
        { title: "task 1", status: "Not started" },
        { title: "task 2", status: "Not started" },
        { title: "task 3", status: "Doing" },
        { title: "task 4", status: "Done" }
      ]
    };
  },
  computed: {
    boardTasks() {
      return this.$store.getters["board/boardTasks"];
    },
    tasksList: {
      get() {
        return this.tasks;
      },
      set(value) {
        this.tasks = value;
      }
    },
    darkMode() {
      return this.$store.getters["settings/darkMode"];
    },
    textColor() {
      if (this.darkMode) {
        return "color: #ffffff;";
      } else {
        return "color: #000000;";
      }
    }
  },
  mounted() {},
  methods: {
    log: function(evt) {
      window.console.log("log: ", evt);
    },
    onMove: function onMoveCallback(evt, originalEvent) {
      console.log("event: ", evt, "original event: ", originalEvent);
    },
    onAdd: function(event) {
      console.log("add event, ", event);
      if (event.target.id != event.from.id) {
        console.log("task status is not the same as stage");
        let arr = this.tasks;
        for (let index = 0; index < arr.length; index++) {
          const e = arr[index];
          if (e.title === event.item._underlying_vm_.title) {
            console.log("task status is the same as the found stage");
            e.status = event.target.id;
            console.log(e.title);
          }
        }
        this.tasks = arr;
      }
    },
    setStageLayout() {
      let stagesLayout = [];
      let x = -3;
      let y = 0;
      let h = 15;
      let w = 3;
      for (let index = 0; index < this.stages.length; index++) {
        const i = this.stages[index];
        x += 3;

        const layoutObject = {
          i: i,
          x: x,
          y: y,
          h: h,
          w: w
        };
        stagesLayout.push(layoutObject);
      }
      this.layout = stagesLayout;
      return stagesLayout;
    }
  }
};
</script>
<style lang="less" scoped>
.stages-grid {
  width: 100%;
  min-height: 500px;
  height: 100%;
  background-color: #e8e9e8;
  position: relative;
}
.stage {
  max-width: 90%;
  max-height: 90%;
  //   background-color: var(--v-primary-base);
  background-color: white;
  position: absolute;
}
</style>
