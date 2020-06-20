<template>
  <v-row
    no-gutters
    align="stretch"
    justify="center"
    style="height:100%; width: 100%;"
  >
    <div class="dragdropbox" ref="dragdropbox">
      <div class="no-drop drag-drop" ref="no">no drop</div>
      <div class="yes-drop drag-drop" ref="yes">yes drop</div>

      <div class="dragdropcontainer">
        <div id="outer-dropzone" class="dropzone">
          outer-dropzone
        </div>
        <div id="inner-dropzone" class="dropzone">
          inner-dropzone
        </div>
      </div>
    </div>
  </v-row>
</template>
<script>
// import interact from "interactjs";
import dragAndDrop from "../utils/dragAndDrop";
export default {
  name: "Stages",
  components: {},
  props: {
    stages: Array,
    default() {
      return [];
    },
  },

  data() {
    return {
      name: "Stages",
      //   screenX: 0,
      //   screenY: 0,
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
  },
  mounted() {
    let $yes = this.$refs.yes;
    let $restrict = this.$refs.dragdropbox;
    dragAndDrop($yes, $restrict);
    // this.initInteract(this.$refs.dropzone, this.$refs.draggable);
    // this.$nextTick(() => {
    //   this.initInteract(this.$refs.dropzone, this.$refs.draggable);
    // });
  },
  methods: {
    // initInteract: function(dropzone, draggable) {
    //   console.log("initInteract dropzone: ", dropzone, "draggable:", draggable);
    //   interact(dropzone).dropzone({
    //     // only accept elements matching this CSS selector
    //     accept: "#yes-drop",
    //     // Require a 75% element overlap for a drop to be possible
    //     overlap: 0.75,
    //     ondropactivate: this.onDropActive,
    //     ondragenter: this.onDragEnter,
    //     ondragleave: this.onDragLeave,
    //     ondrop: this.onDrop,
    //     ondropdeactivate: this.onDropDeactivate,
    //   });
    //   interact(draggable).draggable({
    //     inertia: true,
    //     //   modifiers: [
    //     //     interact.modifiers.restrict({
    //     //       restriction: "parent",
    //     //       endOnly: true,
    //     //     }),
    //     //   ],
    //     autoScroll: true,
    //     onstart: this.onDragStart,
    //     onmove: this.dragMoveListener,
    //     onend: this.onDragEnd,
    //   });
    // },
    // onDropActive: function(event) {
    //   // add active dropzone feedback
    //   event.target.classList.add("drop-active");
    // },
    // onDragEnter: function(event) {
    //   var draggableElement = event.relatedTarget;
    //   var dropzoneElement = event.target;
    //   // feedback the possibility of a drop
    //   dropzoneElement.classList.add("drop-target");
    //   draggableElement.classList.add("can-drop");
    //   draggableElement.textContent = "Dragged in";
    // },
    // onDragLeave: function(event) {
    //   // remove the drop feedback style
    //   event.target.classList.remove("drop-target");
    //   event.relatedTarget.classList.remove("can-drop");
    //   event.relatedTarget.textContent = "Dragged out";
    // },
    // onDrop: function(event) {
    //   event.target.appendChild(event.relatedTarget);
    //   event.relatedTarget.textContent = "Dropped";
    // },
    // onDropDeactivate: function(event) {
    //   // remove active dropzone feedback
    //   event.target.classList.remove("drop-active");
    //   event.target.classList.remove("drop-target");
    // },
    // dragMoveListener: function(event) {
    //   console.log("drag move listener", event);
    //   var target = event.target;
    //   // keep the dragged position in the data-x/data-y attributes
    //   var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    //   var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    //   // translate the element
    //   target.style.webkitTransform = target.style.transform =
    //     "translate(" + x + "px, " + y + "px)";
    //   // update the posiion attributes
    //   target.setAttribute("data-x", x);
    //   target.setAttribute("data-y", y);
    // },
    // onDragEnd: function(event) {
    //   var target = event.target;
    //   console.log("drag end", target);
    //   // update the state
    //   this.screenX = target.getBoundingClientRect().left;
    //   this.screenY = target.getBoundingClientRect().top;
    // },
    // onDragStart: function(event) {
    //   var target = event.target;
    //   console.log("drag start", target);
    // },
  },
};
</script>
<style lang="less" scoped>
.dragdropbox {
  display: block;
  width: 100%;
  height: 500px;
  background-color: #ccc;
  .no-drop,
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
.dragdropcontainer {
  display: inline-block;
  position: relative;
  width: 400px;
  height: 300px;
  padding: 20px;
  background-color: #ddd;
  z-index: 10;
  #outer-dropzone {
    position: absolute;
    left: 0;
    top: 0;
    height: 140px;
    border: 1px solid #fafafa;
  }
  #inner-dropzone {
    position: absolute;
    left: 5%;
    top: 10%;
    width: 60%;
    height: 80px;
    border: 1px solid #0071ff;
  }
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
