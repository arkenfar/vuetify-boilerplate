<template>
  <div id="stages-container" class="stages-container">
    <div class="draggable-stage" ref="draggableStage">
      <p>Draggable stage</p>
    </div>
  </div>
</template>
<script>
import interact from "interactjs";

// const position = { x: 0, y: 0 };

// interact(".draggable-stage").draggable({
//   listeners: {
//     start(event) {
//       console.log(event.type, event.target);
//     },
//     move(event) {
//       position.x += event.dx;
//       position.y += event.dy;

//       event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
//     },
//   },
//   modifiers: [
//     interact.modifiers.restrictRect({
//       restriction: "parent",
//     }),
//   ],
// });
// // Draggable stage cursor
// interact(".draggable-stage").draggable({
//   cursorChecker: (action, interactable, element, interacting) => {
//     switch (action.axis) {
//       case "x":
//         return "ew-resize";
//       case "y":
//         return "ns-resize";
//       default:
//         return interacting ? "grabbing" : "grab";
//     }
//   },
// });

export default {
  name: "Stages",
  props: {
    stage: Object,
    default() {
      return {
        screenX: 0,
        screenY: 0,
      };
    },
  },
  data() {
    return {
      name: "Stages",
    };
  },
  computed: {},
  mounted() {
    let myDraggable = this.$refs.draggableStage;
    this.initInteract(myDraggable);
    // this.$nextTick(() => {
    //   console.log("mounted next tick");
    //   let myDraggable = this.$refs.draggableStage;
    //   this.initInteract(myDraggable);
    // });
  },
  methods: {
    initInteract: function(selector) {
      console.log("selector", selector);
      interact(selector).draggable({
        // enable inertial throwing
        // inertia: true,

        // keep the element within the area of it's parent
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        },
        // enable autoScroll
        autoScroll: true,

        //on start
        onstart: this.onDragStart,
        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd,
      });
    },
    dragMoveListener: function(event) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x =
          (parseFloat(target.getAttribute("data-x")) || this.screenX) +
          event.dx,
        y =
          (parseFloat(target.getAttribute("data-y")) || this.screenY) +
          event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    onDragEnd: function(event) {
      var target = event.target;
      console.log("drag end", target);
      // update the state
      this.screenX = target.getBoundingClientRect().left;
      this.screenY = target.getBoundingClientRect().top;
    },
    onDragStart: function(event) {
      var target = event.target;
      console.log("drag start", target);
    },
  },
};
</script>
<style scoped>
.draggable-stage {
  background-color: #29e;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 20px;
  position: absolute;
  width: 120px;
  top: 150px;
  touch-action: none;
  user-select: none;
  /* This makes things *much* easier */
  /* box-sizing: border-box; */
}

.stages-container {
  width: 100%;
  min-height: 360px;
  height: 100%;
  background-color: #e8e9e8;
  position: relative;
}
</style>
