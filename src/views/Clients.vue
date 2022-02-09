<template>
  <v-container fluid fill-height class="align-start" id="clientsContainer">
    <v-card width="100%" max-height="100%">
      <v-card-title
        class="d-flex flex-column flex-sm-row justify-space-between align-stretch align-sm-center"
        style="gap: 10px"
      >
        Clients
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
        :items="clients"
        :search="search"
        key="id"
        :show-select="showSelect"
        :loading="loading"
      >
        <template v-slot:item.pictureUri="props">
          <v-avatar color="#78d64b" size="34">
            <img
              v-if="hasClientImage(props.item)"
              style="object-fit: cover"
              loading="lazy"
              :src="getClientImage(props.item.id)"
              :alt="props.item.name"
            />
            <span v-if="!hasClientImage(props.item)">
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
              ref="clientPictureUpload"
            />
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-center align-center">
                  <v-badge
                    :value="clientPictureNew"
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
                        class="client-picture"
                        color="#78d64b"
                        size="140"
                      >
                        <img
                          :src="getClientEditPicture()"
                          style="object-fit: cover"
                          @load="clientPictureLoaded = true"
                          v-if="hasClientImage(editedItem) || clientPictureNew"
                        />
                        <span
                          v-if="
                            !hasClientImage(editedItem) && !clientPictureNew
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
                          class="client-picture white d-flex align-center justify-center"
                          style="border: 2px solid grey !important"
                          v-if="!clientPictureLoaded"
                        >
                          <v-progress-circular
                            :size="60"
                            color="#78d64b"
                            indeterminate
                          ></v-progress-circular>
                        </div>
                      </v-fade-transition>
                      <div
                        class="client-picture client-picture-btn d-flex align-center justify-center"
                        @click="uploadClientPicture"
                        v-if="!clientPictureNew"
                      >
                        <v-icon x-large color="white"> mdi-camera-flip </v-icon>
                      </div>
                      <div
                        class="client-picture client-picture-btn d-flex align-center justify-center"
                        @click="clearNewPicture"
                        v-if="clientPictureNew"
                      >
                        <v-icon x-large color="white"> mdi-close </v-icon>
                      </div>
                    </div>
                  </v-badge>
                </div>
              </v-col>
            </v-row>
            <v-row class="client-form">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="$v.editedItem.name.$model"
                  :error-messages="getErrorMessages($v.editedItem.name)"
                  label="Client Name *"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="$v.editedItem.vat.$model"
                  :error-messages="getErrorMessages($v.editedItem.vat)"
                  label="VAT *"
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
                  v-model="$v.editedItem.email.$model"
                  counter
                  maxlength="320"
                  :error-messages="getErrorMessages($v.editedItem.email)"
                  label="Email"
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
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-avatar size="40" class="client-picture" color="#78d64b">
                  <img
                    :src="getClientImage(deletingItem.id)"
                    style="object-fit: cover"
                    v-if="hasClientImage(deletingItem)"
                  />
                  <span
                    v-if="!hasClientImage(deletingItem)"
                    class="text-h4 white--text"
                  >
                    {{
                      getItemInitials(deletingItem.name) == ""
                        ? "New"
                        : getItemInitials(deletingItem.name)
                    }}
                  </span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>{{ deletingItem.name }}</v-list-item-title>
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
      clientPictureLoaded: true,
      clientPictureNew: false,
      headers: [
        {
          text: "Logo",
          width: "42px",
          class: ["align-center", "justify-center"],
          value: "pictureUri",
          sortable: false,
        },
        { text: "Name", value: "name" },
        { text: "City", value: "city" },
        { text: "Phone", value: "phone" },
        { text: "Email", value: "email" },
        { text: "Actions", sortable: false, width: "120px", value: "actions" },
      ],
      clients: [],
      showSelect: false,
      itemToDelete: "",
      editedIndex: -1,
      clientImageUri:
        "https://image.shutterstock.com/image-vector/tv-colour-bars-test-card-260nw-1723500985.jpg",
      deletingItem: {
        id: "",
        name: "",
        vat: "",
        pictureUri: "",
        address: "",
        zipCode: "",
        city: "",
        phone: "",
        email: "",
      },
      editedItem: {
        id: "",
        name: "",
        vat: "",
        pictureUri: "",
        address: "",
        zipCode: "",
        city: "",
        phone: "",
        email: "",
      },
      defaultItem: {
        id: "",
        name: "",
        vat: "",
        pictureUri: "",
        address: "",
        zipCode: "",
        city: "",
        phone: "",
        email: "",
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
      vat: {
        required,
      },
      phone: {
        maxLength: maxLength(40),
      },
      email: {
        maxLength: maxLength(320),
      },
    },
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    uploadClientPicture() {
      this.$refs.clientPictureUpload.click();
    },
    clearNewPicture() {
      if (this.$refs.clientPictureUpload)
        this.$refs.clientPictureUpload.value = "";
      this.clientPictureNew = false;
      if (this.hasClientImage(this.editedItem)) {
        this.clientImageUri = this.getClientImage(this.editedItem.id);
      } else {
        this.clientImageUri = "";
      }
    },
    selectedNewPicture() {
      if (this.$refs.clientPictureUpload.files.length > 0) {
        this.clientPictureLoaded = false;
        this.clientImageUri = URL.createObjectURL(
          this.$refs.clientPictureUpload.files[0]
        );
        this.clientPictureNew = true;
      }
    },
    getClientImage(id) {
      return this.$ApiService.Picture("Clients", id);
    },
    getClientEditPicture() {
      return this.clientImageUri;
    },
    hasClientImage(item) {
      return item.pictureUri == "HAS_IMAGE";
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
    fetchClients() {
      this.loading = true;
      this.clients = [];

      this.$ApiService
        .Get("Clients")
        .then((response) => {
          const clientsResponse = JSON.parse(response.data);
          this.clients = clientsResponse.clients;
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
        this.clientImageUri = this.getClientImage(this.editedItem.id);

      this.dialog = true;
    },
    saveDialog() {
      this.$v.$touch();

      if (this.$v.editedItem.$invalid) {
        return;
      }

      if (
        this.editedItem.name.trim() != this.defaultItem.name.trim() &&
        this.clients.findIndex((x) => x.name == this.editedItem.name.trim()) !=
          -1
      ) {
        this.errorMessages = "This room already exists.";
        return;
      }

      this.errorMessages = "";
      this.loading = true;
      this.dialog = false;
      this.editedItem.name = this.editedItem.name.trim();
      this.editedItem.vat = this.editedItem.vat.trim();
      this.editedItem.address = this.editedItem.address.trim();
      this.editedItem.zipCode = this.editedItem.zipCode.trim();
      this.editedItem.city = this.editedItem.city.trim();
      this.editedItem.phone = this.editedItem.phone.trim();
      this.editedItem.email = this.editedItem.email.trim();

      this.saveToServer()
        .then((response) => {
          const clientResponse = JSON.parse(response.data);

          if (
            clientResponse.clients &&
            clientResponse.clients.length > 0 &&
            clientResponse.clients[0].id
          ) {
            this.showSnackbar("Saved Successfully!");
            this.closeDialog();
          } else {
            this.showSnackbar("There was an error while saving the client!");
            this.errorMessages = "There was an error while saving the client!";
            this.dialog = true;
          }

          this.fetchClients();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar("There was an error while saving the client!");
          this.dialog = true;
          this.errorMessages = "There was an error while saving the client!";
          this.fetchClients();
        });
    },
    async saveToServer() {
      var clientRequest = {
        Client: {
          Id: this.editedItem.id == "" ? null : this.editedItem.id,
          Name: this.editedItem.name,
          VAT: this.editedItem.vat,
          PictureUri: this.editedItem.pictureUri,
          Address: this.editedItem.address,
          ZipCode: this.editedItem.zipCode,
          City: this.editedItem.city,
          Phone: this.editedItem.phone,
          Email: this.editedItem.email,
        },
        UserId: "Teste",
      };

      var serviceResponse = await this.$ApiService.InsertUpdate(
        "Clients",
        clientRequest
      );

      const clientResponse = JSON.parse(serviceResponse.data);

      if (
        clientResponse.clients &&
        clientResponse.clients.length > 0 &&
        clientResponse.clients[0].id
      ) {
        //Save the picture if file selected
        if (this.$refs.clientPictureUpload.files.length > 0) {
          var clientImageForm = new FormData();
          var file = this.$refs.clientPictureUpload.files[0];

          clientImageForm.append("ClientPicture", file, file.name);

          await this.$ApiService.PutPicture(
            "Clients",
            clientResponse.clients[0].id,
            clientImageForm
          );
        }
      } else {
        throw clientResponse.error.message;
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
      this.defaultItem.vat = "";
      this.defaultItem.address = "";
      this.defaultItem.zipCode = "";
      this.defaultItem.pictureUri = "";
      this.defaultItem.city = "";
      this.defaultItem.phone = "";
      this.defaultItem.email = "";
      this.editedItem.id = "";
      this.editedItem.name = "";
      this.editedItem.vat = "";
      this.editedItem.address = "";
      this.editedItem.zipCode = "";
      this.editedItem.city = "";
      this.editedItem.phone = "";
      this.editedItem.email = "";
      this.editedItem.pictureUri = "";
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
        .Delete("Clients", this.deletingItem.id)
        .then(() => {
          this.showSnackbar("Deleted Successfully!");
          this.deletingItem.id = "";

          this.fetchClients();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar("There was an error while deleting the client!");
          this.fetchClients();
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
#clientsContainer {
  padding-bottom: 72px;
}

.client-form div {
  padding: 0px 12px;
}

.client-picture {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 140px;
  width: 140px;
  border-radius: 50%;
}

img.client-picture {
  object-fit: cover;
}

.client-picture-btn {
  background: rgba(150, 150, 150, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in;
  cursor: pointer;
}

.client-picture-btn:hover {
  opacity: 1;
}
</style>
