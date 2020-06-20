<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" xs="12">
        <v-card :hover="true" min-height="200">
          <v-card-title>{{goal.title}}</v-card-title>
          <v-card-text>{{goal.description}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Goal",
  props: {
    goal: Object,
    default() {
      return {};
    }
  },
  data() {
    return {
      name: "Goal"
    };
  },
  computed: {},

  methods: {}
};
</script>