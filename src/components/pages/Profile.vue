<template>
  <v-container fluid>
    <v-row v-if="loading" justify="space-around" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <v-row v-else justify="center" align="start" no-gutters>
      <v-card class="width-height-full">
        <v-tabs grow v-model="tab">
          <v-tab>Profile</v-tab>
          <v-tab>Stats</v-tab>
          <v-tab>Settings</v-tab>
        </v-tabs>

        <Error v-if="error" :errorMsg="error"></Error>

        <v-overlay :value="overlay" opacity="0.60">
          <v-card class="overlay" :hover="true" outlined color="secondary">
            <v-row justify="center" align="start" no-gutters>
              <v-col>
                <blockquote
                  class="blockquote subtitle-1 font-weight-medium text-center"
                >
                  {{ overlayText }}
                </blockquote>
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

        <v-divider />

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-container fluid id="container-tab-content">
              <v-row justify="center" align="stretch" no-gutters>
                <v-col cols="12" xs="12">
                  <UserProfile></UserProfile>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid id="container-tab-content">
              <v-row justify="center" align="stretch" no-gutters>
                <v-col cols="12" xs="12">
                  <UserStats></UserStats>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid id="container-tab-content">
              <v-row justify="center" align="stretch" no-gutters>
                <v-col cols="12" xs="12">
                  <UserSettings></UserSettings>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
        <v-divider />
        <v-container fluid v-if="tab != 1 && tab != 2">
          <v-row no-gutters justify="center" align="start">
            <SubmitButton
              class="mb-2"
              style="width: 10%;"
              label="Save"
              :click="save"
            ></SubmitButton>
            <ClearButton
              class="mb-2"
              style="width: 10%;"
              label="Cancel"
              :click="cancel"
            ></ClearButton>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import SubmitButton from "../buttons/SubmitButton";
import ClearButton from "../buttons/ClearButton";
import UserProfile from "../user/UserProfile";
import UserStats from "../user/UserStats";
import UserSettings from "../user/UserSettings";

export default {
  name: "Profile",
  components: {
    Loading,
    Error,
    SubmitButton,
    ClearButton,
    UserProfile,
    UserStats,
    UserSettings,
  },
  data() {
    return {
      name: "Profile",
      error: null,
      tab: null,
      overlay: false,
      overlayText: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    loading() {
      return this.$store.getters["loading/loading"];
    },
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      this.$store.dispatch("user/loadUser");
    },
    save() {
      this.overlay = true;
      this.overlayText =
        "Are you sure you want to save changes to your profile?";
    },
    cancel() {
      this.overlay = true;
      this.overlayText =
        "Are you sure you want cancel? Any unsaved data will be lost.";
    },
    onConfirmSave() {
      this.overlay = false;
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
.overlay {
  min-height: 5rem;
  min-width: 35rem;
  border-style: ridge;
  border-color: "primary";
}
</style>
