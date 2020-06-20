<template>
  <v-card flat>
    <v-container fluid>
      <v-row no-gutters justify="start" align="stretch">
        <v-col cols="12" xs="12">
          <v-row justify="space-around">
            <v-col cols="10">
              <TextInput
                label="Board title"
                name="Board title"
                :textValue.sync="formData.boardTitle"
              ></TextInput>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-col cols="10">
              <TextArea label="Board description" :textAreaValue.sync="formData.boardDescription"></TextArea>
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-col cols="10">
              <ComboBox
                label="Board stages"
                :defaultComboBoxItems.sync="formData.boardStages"
                :maxComboBoxItems="maxStages"
                :minComboBoxItems="minStages"
                name="stages"
              ></ComboBox>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="showButtons == true">
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
import ComboBox from "../selectionControls/ComboBox";

const initFromData = {
  boardTitle: "",
  boardDescription: "",
  boardStages: ["Not started", "Doing", "Done"]
};

export default {
  name: "NewBoard",
  components: { SubmitButton, ClearButton, TextInput, TextArea, ComboBox },
  props: {
    showButtons: Boolean,
    default() {
      return false;
    }
  },
  data() {
    return {
      name: "NewBoard",
      formData: Object.assign({}, initFromData),
      maxStages: 5,
      minStages: 2
    };
  },
  computed: {},

  methods: {
    save() {
      if (
        this.formData.boardStages.length >= this.minStages &&
        this.formData.boardStages.length <= this.maxStages
      ) {
        this.$store.dispatch("boards/newBoard", this.formData);
        this.formData = Object.assign({}, initFromData);
      }
      return;
    },
    clear() {
      this.formData = Object.assign({}, initFromData);
    }
  }
};
</script>