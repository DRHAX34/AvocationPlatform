<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="d-flex flex-column align-center justify-center"
      >
        <v-sheet
          style="z-index: 2"
          class="d-flex justify-center align-center text-h4 white--text"
          color="#78D64B"
          elevation="1"
          min-width="100"
          min-height="100"
          width="fit-content"
          rounded="lg"
          >100</v-sheet
        >
        <v-sheet
          style="
            margin-top: -20px;
            padding-top: 20px;
            padding-bottom: 10px;
            z-index: 1;
          "
          class="d-flex flex-column justify-center align-center"
          color="white"
          elevation="1"
          min-height="80"
          width="100%"
          rounded="lg"
        >
          <span class="text-h6"> Open Positions to Fill </span>
          <span class="text-subtitle-1">
            +36% more than last week
          </span></v-sheet
        >
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="d-flex flex-column align-center justify-center"
      >
        <v-sheet
          style="z-index: 2"
          class="d-flex justify-center align-center text-h4 white--text"
          color="#78D64B"
          elevation="1"
          min-width="100"
          min-height="100"
          width="fit-content"
          rounded="lg"
          >85%</v-sheet
        >
        <v-sheet
          style="
            margin-top: -20px;
            padding-top: 20px;
            padding-bottom: 10px;
            z-index: 1;
          "
          class="d-flex flex-column justify-center align-center"
          color="white"
          elevation="1"
          min-height="80"
          width="100%"
          rounded="lg"
        >
          <span class="text-h6"> Offer Acceptance rate </span>
          <span class="text-subtitle-1"> Same as last week </span></v-sheet
        >
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="d-flex flex-column align-center justify-center"
      >
        <v-sheet
          style="z-index: 2"
          class="d-flex justify-center align-center text-h4 white--text"
          color="#78D64B"
          elevation="1"
          min-width="100"
          min-height="100"
          width="fit-content"
          rounded="lg"
          >15</v-sheet
        >
        <v-sheet
          style="
            margin-top: -20px;
            padding-top: 20px;
            padding-bottom: 10px;
            z-index: 1;
          "
          class="d-flex flex-column justify-center align-center"
          color="white"
          elevation="1"
          min-height="80"
          width="100%"
          rounded="lg"
        >
          <span class="text-h6"> Applicants per opening </span>
          <span class="text-subtitle-1">
            +10% more than last week
          </span></v-sheet
        >
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="d-flex flex-column align-center justify-center"
      >
        <v-sheet
          style="z-index: 2"
          class="d-flex justify-center align-center text-h4 white--text"
          color="#78D64B"
          elevation="1"
          min-width="100"
          min-height="100"
          width="fit-content"
          rounded="lg"
          >60%</v-sheet
        >
        <v-sheet
          style="
            margin-top: -20px;
            padding-top: 20px;
            padding-bottom: 10px;
            z-index: 1;
          "
          class="d-flex flex-column justify-center align-center"
          color="white"
          elevation="1"
          min-height="80"
          width="100%"
          rounded="lg"
        >
          <span class="text-h6"> Selection Ratio </span>
          <span class="text-subtitle-1">
            -10% more than last week
          </span></v-sheet
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <span class="text-h5 font-weight-black">Current Applications</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th></th>
                <th class="text-center">Name</th>
                <th class="text-center">Opening</th>
                <th class="text-center">Work Hours</th>
                <th class="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" class="text-center">Sem dados por mostrar</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
});
</script>
