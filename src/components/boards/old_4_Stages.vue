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
      <!-- <grid-layout
        class="stage-grid"
        :layout.sync="taskLayout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="true"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <template v-for="(task, index) in taskLayout">
          <grid-item
            v-if="task.i.status == item.i"
            class="task"
            :x="task.x"
            :y="task.y"
            :w="task.w"
            :h="task.h"
            :i="task.i"
            :key="index"
            dragAllowFrom=".task-title"
            @moved="movedEvent"
            @move="moveEvent"
          >
            <p class="task-title text-center">{{ task.i.title }}</p>
          </grid-item>
        </template>
      </grid-layout> -->
      <div class="task-drag-drop-box" ref="taskdragdropbox">
        <div class="task-drag-drop-container" ref="taskdragdropcontainer">
          <div class="task-dropzone" ref="taskdropzone">
            <div class="yes-drop drag-drop task" ref="task">yes drop</div>
          </div>
        </div>
      </div>
    </grid-item>
  </grid-layout>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import dragAndDrop from "../utils/dragAndDrop";

export default {
  name: "Stages",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  props: {
    stages: Array,
    default() {
      return [];
    },
  },

  data() {
    return {
      name: "Stages",
      layout: this.setStageLayout(),
      taskLayout: [],
      //   tasks: [
      //     { title: "task 1", status: "Not started" },
      //     { title: "task 2", status: "Not started" },
      //     { title: "task 1", status: "Doing" },
      //     { title: "task 1", status: "Done" },
      //   ],
    };
  },
  computed: {
    boardTasks() {
      return this.$store.getters["board/boardTasks"];
    },
    tasks() {
      return [
        { title: "task 1", status: "Not started" },
        { title: "task 2", status: "Not started" },
        { title: "task 1", status: "Doing" },
        { title: "task 1", status: "Done" },
      ];
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
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.setTaskLayout();
    // });
    let $task = this.$refs.task;
    let $restrict = this.$refs.taskdropzone;
    dragAndDrop($task, $restrict);
  },
  methods: {
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
          w: w,
        };
        stagesLayout.push(layoutObject);
      }
      this.layout = stagesLayout;
      return stagesLayout;
    },
    setTaskLayout() {
      let taskLayout = [];
      let x = -4;
      let y = 0;
      let h = 3;
      let w = 4;
      for (let index = 0; index < this.tasks.length; index++) {
        const i = this.tasks[index];
        x += 4;

        const layoutObject = {
          i: i,
          x: x,
          y: y,
          h: h,
          w: w,
        };
        taskLayout.push(layoutObject);
      }
      this.taskLayout = taskLayout;
      return taskLayout;
    },
  },
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

.task-drag-drop-box {
  display: block;
  width: 100%;
  height: 500px;
  background-color: #ccc;
  .yes-drop {
    display: inline-block;
    position: relative;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    z-index: 99;
  }
  .yes-drop {
    width: 20px;
    height: 20px;
  }
}

.task-drag-drop-container {
  display: inline-block;
  position: relative;
  width: 400px;
  height: 300px;
  padding: 20px;
  background-color: #ddd;
  z-index: 10;
  .task-dropzone {
    position: absolute;
    left: 5%;
    top: 10%;
    width: 60%;
    height: 80px;
    border: 1px solid #0071ff;
  }
}

.task-dropzone {
  background-color: #ccc;
  border: dashed 4px transparent;
  border-radius: 4px;
  margin: 10px auto 30px;
  padding: 10px;
  width: 80%;
  transition: background-color 0.3s;
}

.drop-active {
  border-color: #aaa;
}
.drop-target {
  background-color: #29e;
  border-color: #fff;
  border-style: solid;
}
.drag-drop {
  display: inline-block;
  min-width: 40px;
  padding: 2em 0.5em;
  color: #fff;
  background-color: #29e;
  border: solid 2px #fff;
  touch-action: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  transition: background-color 0.3s;
}
.drag-drop.can-drop {
  color: #000;
  background-color: #4e4;
}

.task {
  //   background-color: var(--v-primary-base);
  z-index: 100;
  background-color: red;
}
</style>
