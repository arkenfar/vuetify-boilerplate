<template>
  <v-container id="container-login" max class="mx-auto">
    <v-row v-if="loading" justify="center" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <Error v-if="error" :errorMsg="error"></Error>
    <v-row v-if="!loading">
      <v-col cols="12" xs="12">
        <v-card class="mx-auto pa-3">
          <ValidationObserver ref="observer">
            <form>
              <EmailInput label="E-Mail" name="E-Mail" :emailValue.sync="formData.email" />
              <PasswordInput
                label="Password"
                name="Password"
                rules="required"
                :passwordValue.sync="formData.password"
              />
              <CheckBox :checkBoxValue.sync="formData.rememberMe" label="Remeber me"></CheckBox>
              <v-divider class="mb-4 mt-2" />
              <SubmitButton :click="submitForm" />
              <ClearButton :click="clearForm" />
              <v-divider class="mb-4 mt-2" />
              <a class="ml-1 overline" @click="onForgotPassword">Forgot password?</a>
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
import SubmitButton from "../buttons/SubmitButton";
import ClearButton from "../buttons/ClearButton";
import EmailInput from "../inputs/EmailInput";
import PasswordInput from "../inputs/PasswordInput";
import CheckBox from "../selectionControls/CheckBox";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

const initFromData = {
  email: "",
  password: "",
  rememberMe: false
};

export default {
  name: "Login",
  components: {
    ValidationObserver,
    EmailInput,
    SubmitButton,
    ClearButton,
    PasswordInput,
    Loading,
    Error,
    CheckBox
  },
  data: () => ({
    formData: Object.assign({}, initFromData),
    loading: false,
    error: null
  }),
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    async submitForm() {
      this.loading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.error =
          "Log in form does not meet the requirements of the 'Email' and 'Password' field";
        this.loading = false;
        return;
      }

      await this.onLognIn(this.formData);
      this.loading = false;
    },
    clearForm() {
      this.formData = Object.assign({}, initFromData);
      this.$refs.observer.reset();
    },
    onLognIn(user) {
      this.$store.dispatch("user/logUserIn", user).then(res => {
        if (res != null && res != undefined) {
          this.error = res.error.message;
        }
      });
    },
    onForgotPassword() {
      this.$router.push("/forgotpassword");
    }
  }
};
</script>

<style scoped></style>
