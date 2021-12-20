<template>
  <v-container fluid fill-height style="max-height: 100%">
    <v-row style="height: 100%">
      <v-col cols="12" md="8" style="border-right: 1px solid #c4c4c4">
        <div
          class="d-flex flex-row justify-space-between"
          style="min-height: 64px"
        >
          <span class="text-h4" style="text-transform: capitalize">{{
            dateToMonth(currentDate)
          }}</span>
          <div class="d-flex d-row">
            <v-btn
              icon
              @click="
                closeDialog();
                dialog = true;
              "
              class="d-none d-sm-inline-flex"
              ><v-icon dark> mdi-plus </v-icon></v-btn
            >
            <v-btn icon @click="$refs.calendar.prev()"
              ><v-icon dark> mdi-less-than </v-icon></v-btn
            >
            <v-btn icon @click="$refs.calendar.next()"
              ><v-icon dark> mdi-greater-than </v-icon></v-btn
            >
          </div>
        </div>
        <v-row style="height: calc(100% - 64px)"
          ><v-col
            ><v-calendar
              v-model="value"
              ref="calendar"
              :weekdays="[0, 1, 2, 3, 4, 5, 6]"
              type="month"
              mode="stack"
              @change="changeDate"
            ></v-calendar
          ></v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="scheduled-meetings-scroll">
        <v-row>
          <v-col class="text-h4 text-center">Scheduled Meetings</v-col>
        </v-row>
        <v-row class="scheduled-meetings-holder">
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="white" elevation="1">
              <div class="appointment-holder">
                <div class="appointment-time">00:00 AM</div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    <span class="position-title">Software Engineer</span> |
                    <span class="position-time">Full-Time</span>
                  </div>
                  <div class="appointment-company">
                    Very Real Company, Incorporated
                  </div>
                </div>
                <div class="appointment-menu">
                  <v-btn icon><v-icon dark> mdi-dots-vertical </v-icon></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            defaultItem["id"] && defaultItem["id"] != "" ? "Edit" : "New"
          }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row class="client-form">
              <v-col cols="12" sm="6">
                <v-menu
                  ref="dateMenu"
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.date"
                      label="Appointment date"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.date"
                    :min="getCurrentDate()"
                    :show-current="getCurrentDate()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="timeMenu"
                  v-model="timeMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.timeStart"
                      label="Start Time"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="editedItem.timeStart"
                    full-width
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-menu
                  ref="durationMenu"
                  v-model="durationMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.duration"
                      label="Duration"
                      prepend-icon="mdi-clock"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="editedItem.duration"
                    full-width
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" style="position: relative">
                <v-select
                  required
                  v-model="editedItem.candidateId"
                  :error-messages="getErrorMessages(editedItem.candidateId)"
                  :items="candidates"
                  prepend-icon="mdi-account-box-outline"
                  single-line
                  menu-props="auto"
                  label="Candidate *"
                  item-text="preferredName"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" style="position: relative">
                <v-select
                  required
                  v-model="editedItem.roomId"
                  :error-messages="getErrorMessages(editedItem.roomId)"
                  :items="rooms"
                  prepend-icon="mdi-door-sliding"
                  single-line
                  menu-props="auto"
                  label="Room *"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" style="position: relative">
                <v-select
                  v-model="editedItem.openingId"
                  :error-messages="getErrorMessages(editedItem.openingId)"
                  :items="openings"
                  prepend-icon="mdi-briefcase-search"
                  single-line
                  menu-props="auto"
                  label="Opening"
                  item-text="title"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" style="position: relative">
                <v-select
                  required
                  v-model="editedItem.stage"
                  :error-messages="getErrorMessages(editedItem.stage)"
                  :items="[1, 2, 3]"
                  single-line
                  menu-props="auto"
                  label="Stage *"
                ></v-select>
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
          >Are you sure you want to delete the selected
          appointment?</v-card-title
        >

        <v-card-text class="d-flex flex-column align-center justify-center">
          <v-list>
            <v-list-item two-line>
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
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import Vue from "vue";

export default Vue.extend({
  name: "Appointments",
  mixins: [validationMixin],
  data: () => ({
    fab: false,
    errorMessages: "",
    dialog: false,
    dialogDelete: false,
    dateMenu: false,
    timeMenu: false,
    durationMenu: false,
    activePicker: true,
    candidatesLoading: false,
    roomsLoading: false,
    openingsLoading: false,
    candidates: [],
    openings: [],
    rooms: [],
    snack: false,
    snackColor: "",
    snackText: "",
    value:
      new Date().getFullYear().toString() +
      "-" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      new Date().getDate().toString().padStart(2, "0"),
    currentDate: new Date(),
    defaultItem: {
      id: "",
      candidateId: "",
      recruiterId: "",
      roomId: "",
      date: "",
      timeStart: "",
      duration: "",
      startTime: "",
      endTime: "",
      openingId: "",
      clientId: "",
      stage: 0,
    },
    editedItem: {
      id: "",
      candidateId: "",
      recruiterId: "",
      roomId: "",
      date: "",
      timeStart: "",
      duration: "",
      startTime: "",
      endTime: "",
      openingId: "",
      clientId: "",
      stage: 0,
    },
    deletingItem: {
      id: "",
      candidateId: "",
      recruiterId: "",
      roomId: "",
      date: "",
      timeStart: "",
      duration: "",
      startTime: "",
      endTime: "",
      openingId: "",
      clientId: "",
      stage: 0,
    },
  }),
  validations: {
    editedItem: {
      candidateId: {
        required,
      },
      recruiterId: {
        required,
      },
      stage: {
        required,
      },
    },
  },
  mounted() {
    this.fetchOpenings();
    this.fetchCandidates();
    this.fetchRecruiters();
    this.fetchRooms();
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
    getCurrentDate() {
      return (
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        new Date().getDate().toString().padStart(2, "0")
      );
    },
    changeDate(calendarDate) {
      this.currentDate.setMonth(calendarDate.start.month - 1);
      this.currentDate.setFullYear(calendarDate.start.year);

      this.$forceUpdate();
    },
    dateToMonth() {
      return (
        this.currentDate.toLocaleString("default", { month: "long" }) +
        " " +
        this.currentDate.getFullYear()
      );
    },
    fetchOpenings() {
      this.openingsLoading = true;
      this.openings = [];

      this.$ApiService
        .Get("Openings")
        .then((response) => {
          const openingsResponse = JSON.parse(response.data);
          this.openings = openingsResponse.openings;
          this.openingsLoading = false;
        })
        .catch((err) => {
          console.log("Failed to fetch data...");
          console.log(err);
          this.showSnackbar("Failed to fetch new data...", "error");
          this.loading = false;
        });
    },
    fetchRecruiters() {
      this.openingsLoading = true;
      this.openings = [];

      this.$ApiService
        .Get("Recruiter")
        .then((response) => {
          const recruitersResponse = JSON.parse(response.data);
          this.recruiters = recruitersResponse.recruiters;
          this.recruitersLoading = false;
        })
        .catch((err) => {
          console.log("Failed to fetch data...");
          console.log(err);
          this.showSnackbar("Failed to fetch new data...", "error");
          this.loading = false;
        });
    },
    fetchCandidates() {
      this.candidatesLoading = true;
      this.candidates = [];

      this.$ApiService
        .Get("Candidates")
        .then((response) => {
          const candidatesResponse = JSON.parse(response.data);
          this.candidates = candidatesResponse.candidates;
          this.candidatesLoading = false;
        })
        .catch((err) => {
          console.log("Failed to fetch data...");
          console.log(err);
          this.showSnackbar("Failed to fetch new data...", "error");
          this.loading = false;
        });
    },
    fetchRooms() {
      this.roomsLoading = true;
      this.rooms = [];

      this.$ApiService
        .Get("Room")
        .then((response) => {
          const roomsResponse = JSON.parse(response.data);
          this.rooms = roomsResponse.rooms;
          this.roomsLoading = false;
        })
        .catch((err) => {
          console.log("Failed to fetch data...");
          console.log(err);
          this.showSnackbar("Failed to fetch new data...", "error");
          this.loading = false;
        });
    },
    showSnackbar(text, type) {
      this.snack = true;
      this.snackColor = type;
      this.snackText = text;
    },
    saveDialog() {
      console.log("This gonna save the appointment");
    },
    deleteItemConfirm() {
      console.log("This gonna delete the appointment");
    },
    closeDialog() {
      this.$v.$reset();
      this.dialog = false;
      this.errorMessages = "";
      this.defaultItem.id = "";
      this.defaultItem.candidateId = "";
      this.defaultItem.recruiterId = "";
      this.defaultItem.roomId = "";
      this.defaultItem.date = this.value;
      this.defaultItem.timeStart =
        new Date().getHours() + ":" + new Date().getMinutes();
      this.defaultItem.duration = "00:30";
      this.defaultItem.startTime = "";
      this.defaultItem.endTime = "";
      this.defaultItem.openingId = "";
      this.defaultItem.clientId = "";
      this.defaultItem.stage = "";
      this.editedItem.id = "";
      this.editedItem.candidateId = "";
      this.editedItem.recruiterId = "";
      this.editedItem.roomId = "";
      this.editedItem.date = this.value;
      this.editedItem.timeStart =
        new Date().getHours() + ":" + new Date().getMinutes();
      this.editedItem.duration = "00:30";
      this.editedItem.startTime = "";
      this.editedItem.endTime = "";
      this.editedItem.openingId = "";
      this.editedItem.clientId = "";
      this.editedItem.stage = "";
    },
    addAppointment() {
      console.log("teste");
    },
  },
});
</script>

<style lang="scss" scoped>
.scheduled-meetings-scroll {
  overflow: auto;
  padding-bottom: 74px;
}
.appointment-holder {
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.appointment-holder .appointment-time {
  text-align: center;
  flex-basis: 60px;
  font-weight: bold;
}

.appointment-holder .appointment-title .position-title {
  font-weight: bold;
}

.appointment-holder .appointment-details {
  display: flex;
  flex-direction: column;
}

.scheduled-meetings-holder .col {
  padding: 6px 12px;
}

@media (min-width: 600px) {
  .scheduled-meetings-scroll {
    max-height: calc(100vh - 120px);
    padding-bottom: 0px;
  }
}
</style>
