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
              <TextInput
                label="First Name"
                name="First Name"
                rules="required|min:2|max:50|alpha"
                :textValue.sync="formData.firstName"
                :success="firstNameValid"
              />
              <TextInput
                label="Last Name"
                name="Last Name"
                rules="required|min:2|max:50|alpha"
                :textValue.sync="formData.lastName"
                :success="lastNameValid"
              />
              <EmailInput
                label="E-Mail"
                name="E-Mail"
                :emailValue.sync="formData.email"
              />
              <PasswordInput
                label="Password"
                name="Password"
                rules="required|min:8"
                counter="8"
                :passwordValue.sync="formData.password"
                :success="comparePasswords.passwordsMatch ? true : false"
              />
              <PasswordInput
                label="Confirm Password"
                name="Confirm Password"
                rules="required|min:8"
                counter="8"
                :passwordValue.sync="formData.confirmPassword"
                :errorMsg="
                  !comparePasswords.passwordsMatch
                    ? comparePasswords.message
                    : ''
                "
                :successMsg="
                  comparePasswords.passwordsMatch
                    ? comparePasswords.message
                    : ''
                "
              />
              <v-divider class="mb-4 mt-2" />
              <SubmitButton :click="submitForm" />
              <ClearButton :click="clearForm" />
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, min, max, alpha } from "vee-validate/dist/rules";
import { ValidationObserver, extend, setInteractionMode } from "vee-validate";
import SubmitButton from "../buttons/SubmitButton";
import ClearButton from "../buttons/ClearButton";
import EmailInput from "../inputs/EmailInput";
import PasswordInput from "../inputs/PasswordInput";
import TextInput from "../inputs/TextInput";
import Error from "../shared/Error";
import Loading from "../shared/Loading";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("alpha", {
  ...alpha,
  message: "{_field_} can only contain alphabetic characters",
});

extend("min", {
  ...min,
  message: "{_field_} must contain at least {length} characters",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

const initFromData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default {
  name: "SignUp",
  components: {
    ValidationObserver,
    EmailInput,
    SubmitButton,
    ClearButton,
    PasswordInput,
    TextInput,
    Error,
    Loading,
  },
  data() {
    return {
      name: "SignUp",
      formData: Object.assign({}, initFromData),
      error: null,
      errorMsg: "",
      loading: false,
    };
  },
  computed: {
    comparePasswords() {
      if (
        this.formData.confirmPassword == this.formData.password &&
        this.formData.confirmPassword != null &&
        this.formData.password != null &&
        this.formData.confirmPassword != "" &&
        this.formData.password != ""
      ) {
        let results = {
          passwordsMatch: true,
          message: "Passwords match",
        };
        return results;
      }
      if (
        this.formData.confirmPassword !== this.formData.password &&
        this.formData.confirmPassword != null &&
        this.formData.password != null &&
        this.formData.confirmPassword != "" &&
        this.formData.password != ""
      ) {
        let results = {
          passwordsMatch: false,
          message: "Passwords did not match",
        };
        return results;
      }
      return "";
    },
    firstNameValid() {
      if (
        this.formData.firstName.length >= 2 &&
        this.formData.firstName.length <= 50
      ) {
        return true;
      }
      return false;
    },
    lastNameValid() {
      if (
        this.formData.lastName.length >= 2 &&
        this.formData.lastName.length <= 50
      ) {
        return true;
      }
      return false;
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    async submitForm() {
      this.loading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.error =
          "Sign up form does not meet requirements of the required fields.";
        this.loading = false;
        return;
      }
      await this.onSignUp(this.formData);
      this.loading = false;
    },
    clearForm() {
      this.formData = Object.assign({}, initFromData);
      this.$refs.observer.reset();
    },
    onSignUp(user) {
      this.$store.dispatch("user/signUserUp", user).then((res) => {
        if (res != null && res != undefined) {
          this.error = res.error.message;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
