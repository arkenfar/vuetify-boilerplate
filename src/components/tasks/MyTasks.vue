<template>
  <v-card flat>
    <v-container fluid>
      <v-row no-gutters justify="center" align="start">
        <v-col cols="12" xs="12" v-for="t in visibleTasks" :key="t.name">
          <v-container>
            <v-row>
              <Task
                :task="t"
                :showOpenButton="showOpenButton"
                :showDeleteButton="showDeleteButton"
              ></Task>
            </v-row>
          </v-container>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-pagination
            v-model="page"
            :length="pages"
            :total-visible="pages"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import Task from "./Task";
export default {
  name: "MyTasks",
  components: { Task },
  props: {
    showOpenButton: Boolean,
    showDeleteButton: Boolean,
    default() {
      return {
        showOpenButton: true,
        showDeleteButton: false,
      };
    },
  },
  data() {
    return {
      name: "MyTasks",
      pagination: { page: 1, rowsPerPage: 1, perPage: 6 },
    };
  },
  computed: {
    page: {
      get() {
        return this.pagination.page;
      },
      set(value) {
        this.pagination.page = value;
      },
    },
    tasks() {
      return this.$store.getters["tasks/tasks"];
    },
    pages() {
      return this.pagination.perPage
        ? Math.ceil(this.tasks.length / this.pagination.perPage)
        : 0;
    },
    visibleTasks() {
      return this.tasks.slice(
        (this.pagination.page - 1) * this.pagination.perPage,
        this.pagination.page * this.pagination.perPage
      );
    },
  },
  mounted() {
    this.loadTasks();

    if (this.$vuetify.breakpoint.smAndDown) {
      this.pagination = { page: 1, rowsPerPage: 1, perPage: 2 };
    }
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
    loadTasks() {
      this.$store.dispatch("tasks/loadTasks");
    },
  },
};
</script>
