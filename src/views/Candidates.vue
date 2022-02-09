<template>
  <v-container fluid fill-height class="align-start" id="candidatesContainer">
    <v-card width="100%" max-height="100%">
      <v-card-title
        class="d-flex flex-column flex-sm-row justify-space-between align-stretch align-sm-center"
        style="gap: 10px"
      >
        Candidates
        <v-spacer class="d-none d-sm-flex"></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer class="d-none d-md-flex"></v-spacer>
        <v-btn
          class="d-none d-md-inline-flex"
          color="#78d64b"
          @click="
            closeDialog();
            dialog = true;
          "
          dark
        >
          <v-icon>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="candidates"
        :search="search"
        key="id"
        :show-select="showSelect"
        :loading="loading"
      >
        <template v-slot:item.profilePictureUri="props">
          <v-avatar color="#78d64b" size="34">
            <img
              v-if="hasCandidateImage(props.item)"
              style="object-fit: cover"
              loading="lazy"
              :src="getCandidateImage(props.item.id)"
              :alt="props.item.name"
            />
            <span v-if="!hasCandidateImage(props.item)">
              {{ getItemInitials(props.item.name) }}
            </span>
          </v-avatar>
        </template>
        <template v-slot:item.actions="props">
          <v-icon @click="openEditDialog(props.item)"> mdi-pencil </v-icon>
          <v-icon
            @click="
              dialogDelete = true;
              showDeleteDialog(props.item);
            "
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            defaultItem["id"] && defaultItem["id"] != "" ? "Edit" : "New"
          }}</span>
        </v-card-title>

        <v-card-text>
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
                  <v-badge
                    :value="candidatePictureNew"
                    content="New"
                    color="#78d64b"
                    offset-x="35px"
                    offset-y="35px"
                    transition="slide-x-reverse-transition"
                  >
                    <div
                      style="
                        height: 140px;
                        width: 140px;
                        position: relative;
                        border-radius: 50%;
                      "
                    >
                      <v-avatar
                        class="candidate-picture"
                        color="#78d64b"
                        size="140"
                      >
                        <img
                          :src="getCandidateEditPicture()"
                          style="object-fit: cover"
                          @load="candidatePictureLoaded = true"
                          v-if="
                            hasCandidateImage(editedItem) || candidatePictureNew
                          "
                        />
                        <span
                          v-if="
                            !hasCandidateImage(editedItem) &&
                            !candidatePictureNew
                          "
                          class="text-h4 white--text"
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
                            :size="60"
                            color="#78d64b"
                            indeterminate
                          ></v-progress-circular>
                        </div>
                      </v-fade-transition>
                      <div
                        class="candidate-picture candidate-picture-btn d-flex align-center justify-center"
                        @click="uploadCandidatePicture"
                        v-if="!candidatePictureNew"
                      >
                        <v-icon x-large color="white"> mdi-camera-flip </v-icon>
                      </div>
                      <div
                        class="candidate-picture candidate-picture-btn d-flex align-center justify-center"
                        @click="clearNewPicture"
                        v-if="candidatePictureNew"
                      >
                        <v-icon x-large color="white"> mdi-close </v-icon>
                      </div>
                    </div>
                  </v-badge>
                </div>
              </v-col>
            </v-row>
            <v-row class="candidate-form">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="$v.editedItem.name.$model"
                  :error-messages="getErrorMessages($v.editedItem.name)"
                  label="Candidate Name *"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="$v.editedItem.surname.$model"
                  :error-messages="getErrorMessages($v.editedItem.surname)"
                  label="Surname *"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="$v.editedItem.preferredName.$model"
                  :error-messages="
                    getErrorMessages($v.editedItem.preferredName)
                  "
                  label="Preferred Name *"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="$v.editedItem.email.$model"
                  :error-messages="getErrorMessages($v.editedItem.email)"
                  counter
                  maxlength="320"
                  label="Email *"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="$v.editedItem.phone.$model"
                  :error-messages="getErrorMessages($v.editedItem.phone)"
                  counter
                  maxlength="40"
                  label="Phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.vat"
                  label="VAT"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.address"
                  label="Address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.zipCode"
                  label="Zip Code"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.city"
                  label="City"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog"> Cancel </v-btn>
          <v-btn color="#78d64b" text @click="saveDialog"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title style="word-break: break-word"
          >Are you sure you want to delete the selected item?</v-card-title
        >

        <v-card-text class="d-flex flex-column align-center justify-center">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="40" class="candidate-picture" color="#78d64b">
                  <img
                    :src="getCandidateImage(deletingItem.id)"
                    style="object-fit: cover"
                    v-if="hasCandidateImage(deletingItem)"
                  />
                  <span
                    v-if="!hasCandidateImage(deletingItem)"
                    class="text-h4 white--text"
                  >
                    {{
                      getItemInitials(deletingItem.preferredName) == ""
                        ? "New"
                        : getItemInitials(deletingItem.preferredName)
                    }}
                  </span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  deletingItem.preferredName
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  deletingItem.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          Note: This action is irreversible!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogDelete = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-fab-transition>
      <v-btn
        class="d-md-none"
        elevation="2"
        @click="
          closeDialog();
          dialog = true;
        "
        fixed
        bottom
        right
        fab
        dark
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      fab: false,
      errorMessages: "",
      dialog: false,
      dialogDelete: false,
      snack: false,
      snackColor: "",
      snackText: "",
      loading: false,
      search: "",
      candidatePictureLoaded: true,
      candidatePictureNew: false,
      headers: [
        {
          text: "Foto",
          width: "42px",
          class: ["align-center", "justify-center"],
          value: "profilePictureUri",
          sortable: false,
        },
        { text: "Name", value: "preferredName" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "City", value: "city" },
        { text: "Actions", sortable: false, width: "120px", value: "actions" },
      ],
      candidates: [],
      showSelect: false,
      itemToDelete: "",
      editedIndex: -1,
      candidateImageUri:
        "https://image.shutterstock.com/image-vector/tv-colour-bars-test-card-260nw-1723500985.jpg",
      deletingItem: {
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
      selectedItems: [],
    };
  },
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
  mounted() {
    this.fetchCandidates();
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
      }
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
    selectedItem(item, value) {
      if (value) {
        this.selectedItems.push(item);
        return;
      }

      var itemIndex = this.selectedItems.indexOf(item);
      this.selectedItems.splice(itemIndex, 1);
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
    fetchCandidates() {
      this.loading = true;
      this.candidates = [];

      this.$ApiService
        .Get("Candidates")
        .then((response) => {
          const candidatesResponse = JSON.parse(response.data);
          this.candidates = candidatesResponse.candidates;
          this.loading = false;
        })
        .catch((err) => {
          console.log("Failed to fetch data...");
          console.log(err);
          this.showSnackbar("Failed to fetch new data...", "error");
          this.loading = false;
        });
    },
    openEditDialog(item) {
      for (var property in item) {
        this.defaultItem[property] = item[property];
        this.editedItem[property] = item[property];
      }

      if (this.editedItem.id != "")
        this.candidateImageUri = this.getCandidateImage(this.editedItem.id);

      this.dialog = true;
    },
    saveDialog() {
      this.$v.$touch();

      if (this.$v.editedItem.$invalid) {
        return;
      }

      this.errorMessages = "";
      this.loading = true;
      this.dialog = false;

      this.editedItem.name = this.editedItem.name.trim();
      this.editedItem.surname = this.editedItem.surname.trim();
      this.editedItem.preferredName = this.editedItem.preferredName.trim();
      this.editedItem.email = this.editedItem.email.trim();
      this.editedItem.phone = this.editedItem.phone.trim();
      this.editedItem.vat = this.editedItem.vat.trim();
      this.editedItem.company = this.editedItem.company.trim();
      this.editedItem.address = this.editedItem.address.trim();
      this.editedItem.zipCode = this.editedItem.zipCode.trim();
      this.editedItem.city = this.editedItem.city.trim();

      this.saveToServer()
        .then((response) => {
          const candidateResponse = JSON.parse(response.data);

          if (
            candidateResponse.candidates &&
            candidateResponse.candidates.length > 0 &&
            candidateResponse.candidates[0].id
          ) {
            this.showSnackbar("Saved Successfully!");
            this.closeDialog();
          } else {
            this.showSnackbar("There was an error while saving the candidate!");
            this.errorMessages =
              "There was an error while saving the candidate!";
            this.dialog = true;
          }

          this.fetchCandidates();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar("There was an error while saving the candidate!");
          this.dialog = true;
          this.errorMessages = "There was an error while saving the candidate!";
          this.fetchCandidates();
        });
    },
    async saveToServer() {
      var candidateRequest = {
        Candidate: {
          Id: this.editedItem.id == "" ? null : this.editedItem.id,
          Name: this.editedItem.name,
          Surname: this.editedItem.surname,
          PreferredName: this.editedItem.preferredName,
          Email: this.editedItem.email,
          Phone: this.editedItem.phone,
          ProfilePictureUri: this.editedItem.profilePictureUri,
          VAT: this.editedItem.vat,
          Company: this.editedItem.company,
          Address: this.editedItem.address,
          ZipCode: this.editedItem.zipCode,
          City: this.editedItem.city,
        },
        UserId: "Teste",
      };

      var serviceResponse = await this.$ApiService.InsertUpdate(
        "Candidates",
        candidateRequest
      );

      const candidateResponse = JSON.parse(serviceResponse.data);

      if (
        candidateResponse.candidates &&
        candidateResponse.candidates.length > 0 &&
        candidateResponse.candidates[0].id
      ) {
        //Save the picture if file selected
        if (this.$refs.candidatePictureUpload.files.length > 0) {
          var candidateImageForm = new FormData();
          var file = this.$refs.candidatePictureUpload.files[0];

          candidateImageForm.append("CandidatePicture", file, file.name);

          await this.$ApiService.PutPicture(
            "Candidates",
            candidateResponse.candidates[0].id,
            candidateImageForm
          );
        }
      } else {
        throw candidateResponse.error.message;
      }

      return serviceResponse;
    },
    closeDialog() {
      this.$v.$reset();
      this.dialog = false;
      this.clearNewPicture();
      this.errorMessages = "";
      this.defaultItem.id = "";
      this.defaultItem.name = "";
      this.defaultItem.surname = "";
      this.defaultItem.preferredName = "";
      this.defaultItem.profilePictureUri = "";
      this.defaultItem.company = "";
      this.defaultItem.vat = "";
      this.defaultItem.address = "";
      this.defaultItem.zipCode = "";
      this.defaultItem.city = "";
      this.defaultItem.phone = "";
      this.defaultItem.email = "";
      this.editedItem.id = "";
      this.editedItem.name = "";
      this.editedItem.surname = "";
      this.editedItem.preferredName = "";
      this.editedItem.email = "";
      this.editedItem.phone = "";
      this.editedItem.profilePictureUri = "";
      this.editedItem.vat = "";
      this.editedItem.company = "";
      this.editedItem.address = "";
      this.editedItem.zipCode = "";
      this.editedItem.city = "";
    },
    showDeleteDialog(item) {
      this.dialogDelete;
      for (var prop in item) {
        this.deletingItem[prop] = item[prop];
      }
    },
    deleteItemConfirm() {
      this.loading = true;
      this.dialogDelete = false;

      this.$ApiService
        .Delete("Candidates", this.deletingItem.id)
        .then(() => {
          this.showSnackbar("Deleted Successfully!");
          this.deletingItem.id = "";

          this.fetchCandidates();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar("There was an error while deleting the candidate!");
          this.fetchCandidates();
        });
    },
    showSnackbar(text, type) {
      this.snack = true;
      this.snackColor = type;
      this.snackText = text;
    },
  },
};
</script>

<style lang="scss" scoped>
#candidatesContainer {
  padding-bottom: 72px;
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
  height: 140px;
  width: 140px;
  border-radius: 50%;
}

img.candidate-picture {
  object-fit: cover;
}

.candidate-picture-btn {
  background: rgba(150, 150, 150, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in;
  cursor: pointer;
}

.candidate-picture-btn:hover {
  opacity: 1;
}
</style>
