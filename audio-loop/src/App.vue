<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
      <div class="d-flex align-center">
        <h1>Loop</h1>
      </div>
    </v-app-bar>

    <v-main>
      <Sequencer/>
    </v-main>
  </v-app>
</template>

<script>
import Sequencer from './components/Sequencer';

export default {
  name: 'App',

  components: {
    Sequencer,
  },

  data: () => ({
    //
  }),
};
</script>
