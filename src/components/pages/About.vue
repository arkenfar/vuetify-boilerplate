<template>
  <v-container fluid>
    <v-row v-if="loading" justify="space-around" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <Error v-if="error" :errorMsg="error"></Error>
    <v-row v-if="!loading && about != null" justify="center" align="stretch">
      <v-card flat class="width-height-full">
        <v-container fluid>
          <v-row no-gutters justify="center" align="stretch">
            <v-col cols="12" xs="12">
              <v-tabs vertical>
                <v-container fluid>
                  <v-row no-gutters justify="start" align="stretch">
                    <v-col cols="12" xs="12">
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-information</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">What is Kanban</v-card-subtitle>
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-help</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">Why Kanban</v-card-subtitle>
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-developer-board</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">How to Kanban</v-card-subtitle>
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-frequently-asked-questions</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">FAQ</v-card-subtitle>
                        </v-tab>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
                <v-tab-item>
                  <v-card flat>
                    <v-container fluid>
                      <v-row no-gutters justify="center" align="center">
                        <v-card-title class="text-left title font-weight-bold">What is Kanban?</v-card-title>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <v-textarea :disabled="true" :value="about.what"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-container fluid>
                      <v-row no-gutters justify="center" align="center">
                        <v-card-title
                          class="text-left title font-weight-bold"
                        >Why should i start using Kanban?</v-card-title>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <v-textarea :disabled="true" :value="about.why"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-container fluid>
                      <v-row no-gutters justify="center" align="center">
                        <v-card-text
                          class="text-center title font-weight-bold"
                        >How do i get started using Kanban?</v-card-text>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <v-textarea :disabled="true" :value="about.how"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-container>
                      <v-row no gutters justify="center">
                        <v-card-text
                          class="text-center title font-weight-bold"
                        >Frequently Asked Questions</v-card-text>
                        <Treeview></Treeview>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Loading from "../shared/Loading";

import Treeview from "../treeview/Treeview";

export default {
  name: "About",
  components: { Loading, Treeview },
  data() {
    return {
      name: "About"
    };
  },
  computed: {
    about() {
      return this.$store.getters["about/about"];
    },
    loading() {
      return this.$store.getters["loading/loading"];
    },
    error() {
      return this.$store.getters["error/error"];
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
    }
  },
  mounted() {
    this.setLoading(true);
    this.loadAbout();
  }
};
</script>

<style scoped>
.width-height-full {
  height: 100%;
  width: 100%;
}
</style>
