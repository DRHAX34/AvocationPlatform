<template>
  <v-container fluid fill-height style="max-height: 100%">
    <v-row style="height: 100%">
      <v-col cols="12" md="8" style="border-right: 1px solid #c4c4c4">
        <div
          class="d-flex flex-row justify-space-between"
          style="min-height: 64px"
        >
          <span class="text-h4" style="text-transform: capitalize">{{
            dateToMonth(calendarDate)
          }}</span>
          <div class="d-flex d-row">
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Appointments",
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changeDate(calendarDate: any): void {
      this.currentDate.setMonth(calendarDate.start.month - 1);
      this.currentDate.setFullYear(calendarDate.start.year);

      this.$forceUpdate();
    },
    dateToMonth(): string {
      return (
        this.currentDate.toLocaleString("default", { month: "long" }) +
        " " +
        this.currentDate.getFullYear()
      );
    },
  },
  data: () => ({
    value: "",
    currentDate: new Date(),
  }),
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
