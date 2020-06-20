<template>
  <div class="resize-container">
    <div
      class="resize-drag"
      style="transform: translate(173px, 2px); width: 100px; height: 105px;"
      data-x="173"
      data-y="2"
    >
      100×105
    </div>
    <div
      class="resize-drag"
      style="transform: translate(43px, -135px);"
      data-x="43"
      data-y="-135"
    >
      Resize from any edge or corner 2
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
// import Task from "../tasks/Task";
interact(".resize-drag")
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute("data-x")) || 0;
        var y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px," + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
        // target.textContent =
        //   Math.round(event.rect.width) +
        //   "\u00D7" +
        //   Math.round(event.rect.height);
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent",
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 },
      }),
    ],

    inertia: true,
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
  });
export default {
  name: "Stage",
  //   components: { Task },
  props: {
    stage: Object,
    default() {
      return {};
    },
  },
  data() {
    return {
      name: "Stage",
    };
  },
  computed: {
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
    currentBoard() {
      return this.$store.getters["board/board"];
    },
    boardTasks() {
      return this.$store.getters["board/boardTasks"];
    },
  },

  methods: {},
};
</script>
<style scoped>
.resize-drag {
  background-color: #29e;
  color: white;
  font-size: 20px;
  font-family: sans-serif;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 20px;
  position: absolute;
  width: 120px;
  top: 150px;

  /* This makes things *much* easier */
  box-sizing: border-box;
}

.resize-container {
  width: 100%;
  height: 360px;
  background-color: #e8e9e8;
  position: relative;
}
</style>
