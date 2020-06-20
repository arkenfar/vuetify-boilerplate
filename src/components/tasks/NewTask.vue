<template>
  <v-card flat>
    <v-container fluid>
      <v-row no-gutters justify="start" align="stretch">
        <v-col cols="12" xs="12">
          <v-row justify="space-around">
            <v-col cols="10">
              <TextInput
                label="Task title"
                name="Task title"
                :textValue.sync="formData.taskTitle"
              ></TextInput>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-col cols="10">
              <TextArea
                label="Task description"
                :textAreaValue.sync="formData.taskDescription"
              ></TextArea>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="showButtons">
            <SubmitButton
              class="mb-1 mt-2"
              style="width: 6rem;"
              label="Save"
              :click="save"
            ></SubmitButton>
            <ClearButton
              class="mb-1 mt-2"
              style="width: 6rem;"
              label="Clear"
              :click="clear"
            ></ClearButton>
          </v-row>
        </v-col>
      </v-row>
      <v-divider v-if="showButtons" />
    </v-container>
  </v-card>
</template>
<script>
import ClearButton from "../buttons/ClearButton";
import SubmitButton from "../buttons/SubmitButton";
import TextInput from "../inputs/TextInput";
import TextArea from "../inputs/TextArea";

const initFromData = {
  taskTitle: "",
  taskDescription: "",
};

export default {
  name: "NewTask",
  components: { SubmitButton, ClearButton, TextInput, TextArea },
  props: {
    value: Object,
    showButtons: Boolean,
    default() {
      return { showButtons: true, value: {} };
    },
  },
  data() {
    return {
      name: "NewTask",
      formData: Object.assign({}, initFromData),
    };
  },
  watch: {
    formData: {
      handler() {
        this.$emit("update:value", this.formData);
      },
      deep: true,
    },
  },
  methods: {
    save() {
      this.$store.dispatch("tasks/newTask", this.formData);
      this.formData = Object.assign({}, initFromData);
    },
    clear() {
      this.formData = Object.assign({}, initFromData);
    },
  },
};
</script>
