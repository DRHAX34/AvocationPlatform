<template>
  <v-app>
    <v-navigation-drawer app :mini-variant.sync="mini" permanent>
      <v-toolbar height="77px" elevation="0">
        <v-app-bar-nav-icon>
          <v-btn icon @click.stop="mini = !mini" v-if="mini">
            <v-icon>mdi-menu</v-icon>
          </v-btn>

          <v-btn icon @click.stop="mini = !mini" v-if="!mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>

        <v-toolbar-title
          ><span class="font-weight-black">AVOCATION</span></v-toolbar-title
        >
      </v-toolbar>
      <v-list style="padding: 0">
        <v-list-item link to="/">
          <v-list-item-icon
            ><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon
          >
          <v-list-item-content>Dashboard</v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Appointments">
          <v-list-item-icon
            ><v-icon>mdi-calendar-range</v-icon></v-list-item-icon
          >
          <v-list-item-content>Appointments</v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon
            ><v-icon>mdi-briefcase-search</v-icon></v-list-item-icon
          >
          <v-list-item-content>Openings</v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon
            ><v-icon>mdi-account-multiple</v-icon></v-list-item-icon
          >
          <v-list-item-content>Clients</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app height="77px" elevate-on-scroll>
      <v-toolbar-title
        ><span class="font-weight-black" v-show="mini">AVOCATION</span> | Main
        Page</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-menu
        transition="slide-y-transition"
        top
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            style="padding: 5px; letter-spacing: normal"
            elevation="0"
            height="fit-content"
            v-bind="attrs"
            v-on="on"
          >
            <div class="flex-row d-flex">
              <div class="flex-column d-flex justify-center">
                <span
                  class="font-weight-black text-right text-capitalize d-none d-md-block"
                  style="font-size: 1.15em"
                  >Victor Saldanha Sitima</span
                >
                <span
                  class="font-weight-light text-right text-lowercase d-none d-md-block"
                  style="font-size: 1.15em"
                  >victor.saldanha.sitima@example.com</span
                >
              </div>
              <v-avatar size="50" style="margin-left: 15px">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="Victor"
                />
              </v-avatar>
            </div>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="justify-center">
            <v-list-item-avatar size="56">
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="Victor"
              />
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black text-center"
                >Victor Saldanha Sitima</v-list-item-title
              >
              <v-list-item-subtitle
                class="font-weight-light text-center text-lowercase"
                >victor.saldanha.sitima@example.com</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid fill-height class="justify-start align-start">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    mini: true,
  }),
});
</script>

<style lang="scss">
.theme--light.v-app-bar.v-toolbar.v-sheet,
.theme--light.v-application {
  background: #f6f6f6 !important;
}

.v-list-item--active .v-list-item__icon {
  color: rgb(120, 214, 75);
}
</style>
