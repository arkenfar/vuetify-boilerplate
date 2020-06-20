<template>
  <v-container id="container-login" max class="mx-auto">
    <v-row v-if="loading" justify="center" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <Error v-if="error" :errorMsg="error"></Error>
    <Success v-if="success" :successMsg="success"></Success>
    <v-row v-if="!loading">
      <v-col cols="12" xs="12">
        <v-card class="mx-auto pa-3">
          <ValidationObserver ref="observer">
            <form>
              <EmailInput label="E-Mail" name="E-Mail" :emailValue.sync="formData.email" />
              <v-divider class="mb-4 mt-2" />
              <SubmitButton :click="submitForm" />
              <ClearButton :click="clearForm" />
              <v-divider class="mb-4 mt-2" />
              <a class="ml-1 overline" @click="onReturnToLogin">Return to login</a>
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, setInteractionMode } from "vee-validate";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import Success from "../shared/Success";
import SubmitButton from "../buttons/SubmitButton";
import ClearButton from "../buttons/ClearButton";
import EmailInput from "../inputs/EmailInput";
import * as firebase from "firebase";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

const initFromData = {
  email: ""
};

export default {
  components: {
    ValidationObserver,
    EmailInput,
    SubmitButton,
    ClearButton,
    Loading,
    Error,
    Success
  },
  data: () => ({
    formData: Object.assign({}, initFromData),
    loading: false,
    error: null,
    success: null
  }),
  methods: {
    submitForm() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.formData.email)
        .then(() => {
          this.error = null;
          this.success =
            "An email was sent to '" +
            this.formData.email +
            "' with password reset instructions";
        })
        .catch(() => {
          this.success = null;
          this.error =
            "Could not send email to '" +
            this.formData.email +
            "'. Are you sure this is the correct email?";
        });
    },
    clearForm() {
      this.formData = Object.assign({}, initFromData);
      this.$refs.observer.reset();
    },
    onReturnToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
