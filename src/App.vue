<template>
  <v-app class="grey lighten-4">
    <NavBar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: 'App',

  components: {
    NavBar
  },

  data: () => ({
    //
  }),

};
</script>
