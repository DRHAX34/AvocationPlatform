/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <v-container fluid fill-height class="align-start" id="meetingRoomsContainer">
    <v-card width="100%" max-height="100%">
      <v-card-title
        class="d-flex flex-column flex-sm-row justify-space-between align-stretch align-sm-center"
        style="gap: 10px"
      >
        Meeting Rooms
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
          @click="dialog = true"
          dark
        >
          <v-icon>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="meetingRooms"
        :search="search"
        key="id"
        :show-select="showSelect"
        :loading="loading"
      >
        <template v-slot:item.avatar="props">
          <v-avatar class="d-none d-sm-inline-flex" color="#78d64b" size="34">
            <span>
              {{ getItemInitials(props.item.name) }}
            </span>
          </v-avatar>
        </template>
        <template v-slot:item.actions="props">
          <v-btn icon text @click="openEditDialog(props.item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon text @click="showDeleteDialog(props.item)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
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
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  :error-messages="errorMessages"
                  label="Meeting Room Name *"
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
          >Are you sure you want to delete the meeting room?</v-card-title
        >
        <v-card-text class="d-flex flex-column align-center justify-center">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar color="#78d64b" size="40">
                  <span class="white--text text-h5">{{
                    getItemInitials(deletingItem.name)
                  }}</span>
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
        @click="dialog = true"
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
      headers: [
        {
          cellClass: ["d-none", "d-sm-table-cell"],
          width: "42px",
          value: "avatar",
        },
        { text: "Name", value: "name" },
        { text: "Actions", sortable: false, width: "120px", value: "actions" },
      ],
      meetingRooms: [],
      showSelect: false,
      deletingItem: {
        id: "",
        name: "",
      },
      editedIndex: -1,
      editedItem: {
        id: "",
        name: "",
      },
      defaultItem: {
        id: "",
        name: "",
      },
      selectedItems: [],
    };
  },
  mounted() {
    this.fetchMeetingRooms();
  },
  methods: {
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
    fetchMeetingRooms() {
      this.loading = true;

      this.$ApiService
        .Get("Room")
        .then((response) => {
          const meetingRoomsResponse = JSON.parse(response.data);
          this.meetingRooms = meetingRoomsResponse.rooms;
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
      this.defaultItem.id = item.id;
      this.defaultItem.name = item.name;
      this.editedItem.id = item.id;
      this.editedItem.name = item.name;
      this.dialog = true;
    },
    saveDialog() {
      if (this.editedItem.name.trim() == "") {
        this.errorMessages = "Please fill this field before saving!";
        return;
      }

      if (
        this.editedItem.name.trim() != this.defaultItem.name.trim() &&
        this.meetingRooms.findIndex(
          (x) => x.name == this.editedItem.name.trim()
        ) != -1
      ) {
        this.errorMessages = "This room already exists.";
        return;
      }

      this.errorMessages = "";
      this.loading = true;
      this.dialog = false;
      this.editedItem.name = this.editedItem.name.trim();

      var roomRequest = {
        Room: {
          Id: this.editedItem.id != "" ? this.editedItem.id : null,
          Name: this.editedItem.name,
        },
        UserId: "Teste",
      };

      this.$ApiService
        .InsertUpdate("Room", roomRequest)
        .then((response) => {
          const roomResponse = JSON.parse(response.data);

          if (
            roomResponse.rooms &&
            roomResponse.rooms.length > 0 &&
            roomResponse.rooms[0].id
          ) {
            this.showSnackbar("Saved Successfully!");
            this.closeDialog();
          } else {
            this.showSnackbar(
              "There was an error while saving the new meeting room!"
            );
            this.errorMessages =
              "There was an error while saving the new meeting room!";
            this.dialog = true;
          }

          this.fetchMeetingRooms();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar(
            "There was an error while saving the meeting room!"
          );
          this.dialog = true;
          this.errorMessages =
            "There was an error while saving the meeting room!";
          this.fetchMeetingRooms();
        });
    },
    closeDialog() {
      this.dialog = false;
      this.errorMessages = "";
      this.defaultItem.id = "";
      this.defaultItem.name = "";
      this.editedItem.id = "";
      this.editedItem.name = "";
      this.deletingItem.id = "";
      this.deletingItem.name = "";
    },
    showDeleteDialog(item) {
      this.dialogDelete = true;
      for (var prop in item) {
        this.deletingItem[prop] = item[prop];
      }
    },
    deleteItemConfirm() {
      this.loading = true;
      this.dialogDelete = false;

      this.$ApiService
        .Delete("Room", this.deletingItem.id)
        .then(() => {
          this.showSnackbar("Deleted Successfully!");
          this.deletingItem.id = "";
          this.deletingItem.name = "";

          this.fetchMeetingRooms();
        })
        .catch((err) => {
          console.log(err);
          this.showSnackbar(
            "There was an error while deleting the meeting room!"
          );
          this.fetchMeetingRooms();
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
#meetingRoomsContainer {
  padding-bottom: 72px;
}
</style>
