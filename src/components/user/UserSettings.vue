<template>
  <v-container fluid>
    <v-row v-if="loading" justify="space-around" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-card flat>
        <v-row no-gutters justify="center" align="stretch">
          <v-col cols="12" xs="12">
            <blockquote class="blockquote mx-auto font-italic">
              Change your accounts settings and security.
              <br />Changes made to the security will force you to log in again.
            </blockquote>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row no-gutters justify="center" align="stretch">
            <v-col cols="12" xs="12">
              <v-tabs vertical>
                <v-container fluid>
                  <v-row no-gutters justify="start" align="stretch">
                    <v-col cols="12" xs="12">
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-rename-box</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">Change Name</v-card-subtitle>
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-email</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">Change E-Mail</v-card-subtitle>
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-lock</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">Change Password</v-card-subtitle>
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-delete</v-icon>
                          <v-card-subtitle class="subtitle-2 text-left">Delete Account</v-card-subtitle>
                        </v-tab>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
                <v-tab-item>
                  <v-card flat>
                    <v-container fluid>
                      <v-row no-gutters justify="center" align="center">
                        <v-card-title
                          class="text-left title font-weight-bold"
                        >Change the name linked to your account</v-card-title>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <TextInput
                            label="First name"
                            name="First name"
                            :textValue.sync="formData.firstName"
                          />
                        </v-col>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <TextInput
                            label="Last name"
                            name="Last name"
                            :textValue.sync="formData.lastName"
                          />
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
                        >Change the email linked to your account</v-card-title>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <EmailInput
                            label="New E-Mail"
                            name="New E-Mail"
                            :emailValue.sync="formData.newEmail"
                          />
                        </v-col>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <EmailInput
                            label="Confirm New E-Mail"
                            name="Confirm New E-Mail"
                            :emailValue.sync="formData.confirmNewEmail"
                          />
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
                        >Change the password used to log in to your account</v-card-text>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <PasswordInput
                            label="New Password"
                            name="New Password"
                            :passwordValue.sync="formData.newPassword"
                          />
                        </v-col>
                      </v-row>
                      <v-row no-gutters justify="center" align="center">
                        <v-col>
                          <PasswordInput
                            label="Confirm New Password"
                            name="Confirm New Password"
                            :passwordValue.sync="formData.confirmNewPassword"
                          />
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
                        >Permanently delete your user</v-card-text>
                        <ClearButton
                          class="mb-2"
                          label="Delete user"
                          style="width: 200px;"
                          :click="deleteUser"
                        ></ClearButton>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-row>

          <ValidationObserver ref="observer"></ValidationObserver>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, setInteractionMode } from "vee-validate";
import Loading from "../shared/Loading";
import ClearButton from "../buttons/ClearButton";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import PasswordInput from "../inputs/PasswordInput";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

const initFromData = {
  firstName: "",
  lastName: "",
  newEmail: "",
  confirmNewEmail: "",
  newPassword: "",
  confirmNewPassword: ""
};

export default {
  name: "UserSettings",
  components: {
    Loading,
    ClearButton,
    EmailInput,
    PasswordInput,
    TextInput,
    ValidationObserver
  },
  data() {
    return {
      name: "UserSettings",
      formData: Object.assign({}, initFromData),
      loading: false,
      error: null
    };
  },

  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  },

  methods: {
    deleteUser() {
      this.$store.dispatch("user/deleteUser");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.width-height-full {
  height: 100%;
  width: 100%;
}
</style>
