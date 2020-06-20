<template>
  <grid-layout
    id="stages-grid"
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
      id="stage"
      class="stage"
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      dragAllowFrom="#stage-title"
    >
      <v-row
        no-gutters
        align="stretch"
        justify="center"
        style="height:100%; width: 100%;"
      >
        <div style="height:100%; width: 100%;" :id="item.i" class="dropzone">
          <p id="stage-title" class="text-center">{{ item.i }}</p>
          <div>
            <div id="yes-drop" class="drag-drop">#yes-drop</div>
          </div>
        </div>
      </v-row>
    </grid-item>
  </grid-layout>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
// var testLayout = [
//   { x: 0, y: 0, w: 4, h: 10, i: "0" },
//   { x: 4, y: 0, w: 4, h: 10, i: "1" },
//   { x: 8, y: 0, w: 4, h: 10, i: "2" },
// ];
import interact from "interactjs";

interact(".dropzone").dropzone({
  // only accept elements matching this CSS selector
  accept: "#yes-drop",
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function(event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function(event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
    draggableElement.textContent = "Dragged in";
  },
  ondragleave: function(event) {
    // remove the drop feedback style
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
    event.relatedTarget.textContent = "Dragged out";
  },
  ondrop: function(event) {
    event.target.appendChild(event.relatedTarget);
    event.relatedTarget.textContent = "Dropped";
  },
  ondropdeactivate: function(event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});

interact(".drag-drop").draggable({
  //   inertia: true,
  //   modifiers: [
  //     interact.modifiers.restrictRect({
  //       restriction: "parent",
  //       endOnly: true,
  //     }),
  //   ],
  //   autoScroll: true,
  // dragMoveListener from the dragging demo above

  listeners: { move: dragMoveListener },
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

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
    };
  },
  computed: {
    boardTasks() {
      return this.$store.getters["board/boardTasks"];
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setStageLayout();
    });
  },
  methods: {
    setStageLayout() {
      let stagesLaylout = [];
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
        stagesLaylout.push(layoutObject);
      }
      this.layout = stagesLaylout;
      return stagesLaylout;
    },
  },
};
</script>
<style scoped>
.stages-grid {
  width: 100%;
  min-height: 500px;
  height: 100%;
  background-color: #e8e9e8;
  position: relative;
}
.stage-grid {
  max-width: 90%;
  max-height: 90%;
  background-color: var(--v-primary-base);
  position: absolute;
}
#outer-dropzone {
  height: 140px;
}

#inner-dropzone {
  height: 80px;
}

.dropzone {
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
  z-index: 1000;
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
</style>
