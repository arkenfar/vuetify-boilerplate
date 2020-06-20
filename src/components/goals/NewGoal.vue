<template>
  <v-card flat>
    <v-container fluid>
      <v-row no-gutters justify="start" align="stretch">
        <v-col cols="12" xs="12">
          <v-row justify="space-around">
            <v-col cols="10">
              <TextInput label="Goal title" name="Goal title" :textValue.sync="formData.goalTitle"></TextInput>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-col cols="10">
              <TextArea label="Goal description" :textAreaValue.sync="formData.goalDescription"></TextArea>
            </v-col>
          </v-row>
          <v-row justify="center">
            <SubmitButton class="mb-1 mt-2" style="width: 6rem;" label="Save" :click="save"></SubmitButton>
            <ClearButton class="mb-1 mt-2" style="width: 6rem;" label="Clear" :click="clear"></ClearButton>
          </v-row>
        </v-col>
      </v-row>
      <v-divider />
    </v-container>
  </v-card>
</template>
<script>
import ClearButton from "../buttons/ClearButton";
import SubmitButton from "../buttons/SubmitButton";
import TextInput from "../inputs/TextInput";
import TextArea from "../inputs/TextArea";

const initFromData = {
  goalTitle: "",
  goalDescription: ""
};

export default {
  name: "NewGoal",
  components: { SubmitButton, ClearButton, TextInput, TextArea },
  data() {
    return {
      name: "NewGoal",
      formData: Object.assign({}, initFromData)
    };
  },
  computed: {},

  methods: {
    save() {
      this.$store.dispatch("goals/newGoal", this.formData);
      this.formData = Object.assign({}, initFromData);
    },
    clear() {
      this.formData = Object.assign({}, initFromData);
    }
  }
};
</script>