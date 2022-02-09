<template>
  <v-container fluid fill-height>
    <v-row class="scheduling-page">
      <v-col
        cols="12"
        md="6"
        class="opening-wrapper justify-center d-flex flex-column"
      >
        <div class="d-flex flex-column align-center opening-description">
          <span class="text-caption">Applying to:</span>
          <span class="text-h4">{{ opening.title }}</span>
          <span class="text-subtitle-1">{{ opening.client }}</span>
          <span class="text-body-2">{{ opening.description }}</span>
        </div>
      </v-col>
      <v-divider vertical class="divider"></v-divider>
      <v-col cols="12" md="6">
        <v-stepper flat v-model="currentStep" vertical>
          <v-stepper-step color="#78d64b" :complete="currentStep > 1" step="1">
            Tell us more about you
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-container>
              <input
                hidden
                type="file"
                @change="selectedNewPicture"
                ref="candidatePictureUpload"
              />
              <v-row>
                <v-col cols="12">
                  <div class="d-flex justify-center align-center">
                    <div
                      class="d-flex align-center justify-center flex-row"
                      style="
                        gap: 15px;
                        border-radius: 15px;
                        padding: 15px;
                        border: 1px solid;
                        position: relative;
                      "
                    >
                      <v-badge
                        :value="candidatePictureNew"
                        content="New"
                        color="#78d64b"
                        offset-x="30px"
                        offset-y="30px"
                        transition="slide-x-reverse-transition"
                      >
                        <div
                          style="
                            height: 80px;
                            width: 80px;
                            position: relative;
                            border-radius: 50%;
                          "
                        >
                          <v-avatar
                            class="candidate-picture"
                            color="#A4A4A4"
                            size="80"
                          >
                            <img
                              :src="getCandidateEditPicture()"
                              style="object-fit: cover"
                              @load="candidatePictureLoaded = true"
                              v-if="
                                hasCandidateImage(editedItem) ||
                                candidatePictureNew
                              "
                            />
                            <span
                              v-if="
                                !hasCandidateImage(editedItem) &&
                                !candidatePictureNew
                              "
                              class="text-h6 white--text"
                            >
                              {{
                                getItemInitials(editedItem.name) == ""
                                  ? "New"
                                  : getItemInitials(editedItem.name)
                              }}
                            </span>
                          </v-avatar>
                          <v-fade-transition>
                            <div
                              class="candidate-picture white d-flex align-center justify-center"
                              style="border: 2px solid grey !important"
                              v-if="!candidatePictureLoaded"
                            >
                              <v-progress-circular
                                :size="80"
                                color="#78d64b"
                                indeterminate
                              ></v-progress-circular>
                            </div>
                          </v-fade-transition>
                        </div>
                      </v-badge>
                      <div
                        class="d-flex flex-column align-center justify-center text-center"
                        v-if="
                          hasCandidateImage(editedItem) || candidatePictureNew
                        "
                      >
                        <span class="text-body-2">{{ currentFileName }}</span>
                        <span class="text-body-2">{{
                          getFileSize(currentFileSize)
                        }}</span>
                      </div>
                      <div
                        class="d-flex flex-column align-center justify-center"
                        v-if="
                          !hasCandidateImage(editedItem) && !candidatePictureNew
                        "
                      >
                        <span class="text-body-2">Upload a profile photo</span>
                        <span class="text-body-2"
                          >PNG, JPG and other photo formats</span
                        >
                      </div>
                      <div
                        class="candidate-picture-btn d-flex align-center justify-center"
                        @click="uploadCandidatePicture"
                        v-if="!candidatePictureNew"
                      >
                        <v-icon large color="white"> mdi-camera-flip </v-icon>
                      </div>
                      <div
                        class="candidate-picture-btn d-flex align-center justify-center"
                        @click="clearNewPicture"
                        v-if="candidatePictureNew"
                      >
                        <v-icon large color="white"> mdi-close </v-icon>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row class="candidate-form">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="$v.editedItem.name.$model"
                    :error-messages="getErrorMessages($v.editedItem.name)"
                    label="Candidate Name *"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="$v.editedItem.surname.$model"
                    :error-messages="getErrorMessages($v.editedItem.surname)"
                    label="Surname *"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="$v.editedItem.preferredName.$model"
                    :error-messages="
                      getErrorMessages($v.editedItem.preferredName)
                    "
                    label="Preferred Name *"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="$v.editedItem.email.$model"
                    :error-messages="getErrorMessages($v.editedItem.email)"
                    counter
                    maxlength="320"
                    label="Email *"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="$v.editedItem.phone.$model"
                    :error-messages="getErrorMessages($v.editedItem.phone)"
                    counter
                    maxlength="40"
                    label="Phone"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.vat"
                    label="VAT"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
            <div class="d-flex flex-column align-center justify-center">
              <v-btn
                :disabled="stepOneFilled"
                color="#78d64b"
                @click="currentStep++"
                outlined
              >
                Save
                <v-icon right dark> mdi-arrow-right </v-icon>
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-step color="#78d64b" :complete="currentStep > 2" step="2">
            Select the best time for you
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-date-picker
                    v-model="datePicker"
                    color="#78d64b"
                  ></v-date-picker>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="12" sm="6">
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Single-line item</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

import Vue from "vue";
export default Vue.extend({
  name: "Onboarding",
  data: () => ({
    opening: {
      title: "Software Engineer",
      client: "Very Real Company, Incorporated",
      description: "",
    },
    candidatePictureLoaded: true,
    candidatePictureNew: false,
    candidateImageUri:
      "https://image.shutterstock.com/image-vector/tv-colour-bars-test-card-260nw-1723500985.jpg",
    currentFileName: "",
    currentFileSize: 0,
    currentStep: 1,
    snack: false,
    snackColor: "",
    snackText: "",
    datePicker:
      new Date().getFullYear().toString() +
      "-" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      new Date().getDate().toString().padStart(2, "0"),
    editedItem: {
      id: "",
      name: "",
      surname: "",
      preferredName: "",
      email: "",
      phone: "",
      profilePictureUri: "",
      vat: "",
      company: "",
      address: "",
      zipCode: "",
      city: "",
    },
    defaultItem: {
      id: "",
      name: "",
      surname: "",
      preferredName: "",
      email: "",
      phone: "",
      profilePictureUri: "",
      vat: "",
      company: "",
      address: "",
      zipCode: "",
      city: "",
    },
  }),
  mixins: [validationMixin],
  validations: {
    editedItem: {
      name: {
        required,
      },
      surname: {
        required,
      },
      preferredName: {
        required,
      },
      email: {
        required,
        maxLength: maxLength(320),
      },
      phone: {
        maxLength: maxLength(40),
      },
    },
  },
  methods: {
    uploadCandidatePicture() {
      this.$refs.candidatePictureUpload.click();
    },
    clearNewPicture() {
      if (this.$refs.candidatePictureUpload)
        this.$refs.candidatePictureUpload.value = "";
      this.candidatePictureNew = false;
      if (this.hasCandidateImage(this.editedItem)) {
        this.candidateImageUri = this.getCandidateImage(this.editedItem.id);
      } else {
        this.candidateImageUri = "";
      }
    },
    selectedNewPicture() {
      if (this.$refs.candidatePictureUpload.files.length > 0) {
        this.candidatePictureLoaded = false;
        this.candidateImageUri = URL.createObjectURL(
          this.$refs.candidatePictureUpload.files[0]
        );
        this.candidatePictureNew = true;
        this.currentFileName = this.$refs.candidatePictureUpload.files[0].name;
        this.currentFileSize = this.$refs.candidatePictureUpload.files[0].size;
        return;
      }
      this.currentFileName = "";
      this.currentFileSize = 0;
    },
    getCandidateImage(id) {
      return this.$ApiService.Picture("Candidates", id);
    },
    getCandidateEditPicture() {
      return this.candidateImageUri;
    },
    hasCandidateImage(item) {
      return item.profilePictureUri == "HAS_IMAGE";
    },
    getErrorMessages(validateItem) {
      if (!this.$v.editedItem.$dirty) {
        return "";
      }

      if (validateItem.maxLength == false) {
        return "Too many characters in this field!";
      }

      if (validateItem.required == false) {
        return "Please fill this field before saving!";
      }

      return "";
    },
    getItemInitials(input) {
      var names = input.split(" ");
      var initials = "";
      for (var name of names) {
        if (name.trim() != "") {
          initials = initials + name.trim().substring(0, 1);
        }
      }

      return initials;
    },
    showSnackbar(text, type) {
      this.snack = true;
      this.snackColor = type;
      this.snackText = text;
    },
    getFileSize(size) {
      if (size < 1024) {
        return size + "Bytes";
      }
      if (size < 1048576) {
        return (size / 1024).toFixed(2) + "KB";
      }
      if (size < 1073741824) {
        return (size / 1048576).toFixed(2) + "MB";
      }

      return (size / 1073741824).toFixed(2) + "GB";
    },
  },
});
</script>

<style lang="scss" scoped>
.opening-wrapper,
.scheduling-page {
  min-height: 100%;
}

.opening-description {
  max-height: 100%;
  overflow-y: auto;
}

@media (min-width: 960px) {
  .scheduling-page {
    min-height: unset;
  }
}
.candidate-form div {
  padding: 0px 12px;
}

.candidate-picture {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 50%;
}

img.candidate-picture {
  object-fit: cover;
}

.candidate-picture-btn {
  position: absolute;
  top: -1px;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 15px;
  background: rgba(150, 150, 150, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in;
  cursor: pointer;
}

.candidate-picture-btn:hover {
  opacity: 1;
}
</style>
