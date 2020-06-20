<template >
  <v-container>
    <v-row v-if="loading" justify="space-around" align="stretch">
      <v-col cols="1" xs="1">
        <Loading :loading="loading" width="5" size="250"></Loading>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-card flat class="width-height-full">
        <v-container fluid>
          <v-row no-gutters justify="center" align="center">
            <v-col cols="12" xs="12">
              <v-img
                src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                max-height="100"
              >
                <v-container fluid>
                  <v-row justify="center" align="center" no-gutters>
                    <v-card-text
                      class="display-1 font-weight-medium text-center"
                    >{{user.firstName + " " + user.lastName}}</v-card-text>
                  </v-row>
                </v-container>
              </v-img>
              <v-tabs vertical>
                <v-container fluid>
                  <v-row no-gutters justify="start" align="stretch">
                    <v-col cols="12" xs="12">
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-account</v-icon>Profile
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-file-outline</v-icon>Tasks
                        </v-tab>
                      </v-row>
                      <v-row>
                        <v-tab>
                          <v-icon left>mdi-developer-board</v-icon>Boards
                        </v-tab>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>

                <v-tab-item>
                  <v-card flat>
                    <v-textarea :value="userProfileText"></v-textarea>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.</p>

                      <p>Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.</p>

                      <p>Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.</p>

                      <p>Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.</p>

                      <p
                        class="mb-0"
                      >Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.</p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.</p>

                      <p
                        class="mb-0"
                      >Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.</p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
              <!-- <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12" xs="12" justify="center" align="start">
                    <blockquote
                      class="blockquote mx-auto"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</blockquote>
                  </v-col>
                </v-row>
              </v-container>-->
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Loading from "../shared/Loading";
export default {
  name: "UserProfile",
  components: { Loading },
  data() {
    return {
      name: "UserProfile",
      loading: false,
      error: null,
      userProfileText:
        "Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo."
    };
  },

  computed: {
    user() {
      return this.$store.getters["user/getUser"];
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
