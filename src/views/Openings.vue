<template>
  <v-container fluid fill-height class="align-start" id="openingsContainer">
    <v-card width="100%" max-height="100%">
      <v-card-title
        class="d-flex flex-column flex-sm-row justify-space-between align-stretch align-sm-center"
        style="gap: 10px"
      >
        Openings
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
        :items="openings"
        :search="search"
        key="id"
        :show-select="showSelect"
        :loading="loading"
      >
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
            <v-row class="opening-form">
              <v-col cols="12">
                <v-text-field
                  v-model="$v.editedItem.title.$model"
                  :error-messages="getErrorMessages($v.editedItem.title)"
                  label="Opening Title *"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  required
                  v-model="$v.editedItem.clientId.$model"
                  :error-messages="getErrorMessages($v.editedItem.clientId)"
                  :items="clients"
                  prepend-icon="mdi-account-multiple"
                  label="Client *"
                  item-text="name"
                  item-value="id"
                  :clearable="true"
                ></v-select>
                <v-progress-linear
                  :active="clientsLoading"
                  :indeterminate="clientsLoading"
                  absolute
                  bottom
                ></v-progress-linear>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  v-model="editedItem.description"
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>* indicates required field</small>
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
              <v-list-item-content>
                <v-list-item-title>{{ deletingItem.title }}</v-list-item-title>
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
import { required } from "vuelidate/lib/validators";

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
      clientsLoading: false,
      search: "",
      openingPictureLoaded: true,
      openingPictureNew: false,
      headers: [
        { text: "Title", value: "title" },
        { text: "Actions", sortable: false, width: "120px", value: "actions" },
      ],
      openings: [],
      showSelect: false,
      itemToDelete: "",
      editedIndex: -1,
      deletingItem: {
        id: "",
        title: "",
        clientId: "",
        description: "",
      },
      editedItem: {
        id: "",
        clientId: "",
        title: "",
        description: "",
      },
      defaultItem: {
        id: "",
        clientId: "",
        title: "",
        description: "",
      },
      selectedItems: [],
    };
  },
  mixins: [validationMixin],
  validations: {
    editedItem: {
      title: {
        required,
      },
      clientId: {
        required,
      },
    },
  },
  mounted() {
    this.fetchOpenings();
    this.fetchClients();
  },
  methods: {
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
    fetchOpenings() {
      this.loading = true;
      this.openings = [];

      this.$ApiService
        .Get("Openings")
        .then((response) => {
          const openingsResponse = JSON.parse(response.data);
          this.openings = openingsResponse.openings;
          this.loading = false;
        })
        .catch((err) => {
          console.log("Failed to fetch data...");
          console.log(err);
          this.showSnackbar("Failed to fetch new data...", "error");
          this.loading = false;
        });
    },
    fetchClients() {
      this.clientsLoading = true;

      this.$ApiService
        .Get("Clients")
        .then((response) => {
          const clientsResponse = JSON.parse(response.data);
          this.clients = clientsResponse.clients;
          this.clientsLoading = false;
        })
        .catch((err) => {
          console.log("Failed to fetch data...");
          console.log(err);
          this.showSnackbar("Failed to fetch new data...", "error");
          this.clientsLoading = false;
        });
    },
    openEditDialog(item) {
      for (var property in item) {
        this.defaultItem[property] = item[property];
        this.editedItem[property] = item[property];
      }

      this.dialog = true;
      this.fetchClients();
    },
    saveDialog() {
      this.$v.$touch();

      if (this.$v.editedItem.$invalid) {
        return;
      }

      this.errorMessages = "";
      this.loading = true;
      this.dialog = false;

      this.editedItem.title = this.editedItem.title.trim();
      this.editedItem.description = this.editedItem.description.trim();

      this.saveToServer()
        .then((response) => {
          const openingResponse = JSON.parse(response.data);

          if (
            openingResponse.openings &&
            openingResponse.openings.length > 0 &&
            openingResponse.openings[0].id
          ) {
            this.showSnackbar("Saved Successfully!");
            this.closeDialog();
          } else {
            this.showSnackbar("There was an error while saving the opening!");
            this.errorMessages = "There was an error while saving the opening!";
            this.dialog = true;
          }

          this.fetchOpenings();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar("There was an error while saving the opening!");
          this.dialog = true;
          this.errorMessages = "There was an error while saving the opening!";
          this.fetchOpenings();
        });
    },
    async saveToServer() {
      var openingRequest = {
        Opening: {
          Id: this.editedItem.id == "" ? null : this.editedItem.id,
          Title: this.editedItem.title,
          Description: this.editedItem.description,
          ClientId: this.editedItem.clientId,
        },
        UserId: "Teste",
      };

      var serviceResponse = await this.$ApiService.InsertUpdate(
        "Openings",
        openingRequest
      );

      const openingResponse = JSON.parse(serviceResponse.data);

      if (
        !openingResponse.openings ||
        openingResponse.openings.length == 0 ||
        !openingResponse.openings[0].id
      ) {
        throw openingResponse.error.message;
      }

      return serviceResponse;
    },
    closeDialog() {
      this.$v.$reset();
      this.dialog = false;
      this.errorMessages = "";
      this.defaultItem.id = "";
      this.defaultItem.title = "";
      this.defaultItem.description = "";
      this.defaultItem.clientId = "";
      this.editedItem.id = "";
      this.editedItem.title = "";
      this.editedItem.description = "";
      this.editedItem.clientId = "";
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
        .Delete("Openings", this.deletingItem.id)
        .then(() => {
          this.showSnackbar("Deleted Successfully!");
          this.deletingItem.id = "";

          this.fetchOpenings();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar("There was an error while deleting the opening!");
          this.fetchOpenings();
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
#openingsContainer {
  padding-bottom: 72px;
}

.opening-form div {
  padding: 0px 12px;
}

.opening-picture {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 140px;
  width: 140px;
  border-radius: 50%;
}

img.opening-picture {
  object-fit: cover;
}

.opening-picture-btn {
  background: rgba(150, 150, 150, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in;
  cursor: pointer;
}

.opening-picture-btn:hover {
  opacity: 1;
}
</style>
