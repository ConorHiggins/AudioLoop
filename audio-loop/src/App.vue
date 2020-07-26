<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
      <div class="d-flex align-center ml-4">
        <h1>Looper</h1>
      </div>

      <v-row>
        <v-btn
          color="dark"
          class="ml-auto mr-8"
          @click="toggleState">
          {{buttonText}}
        </v-btn>
      </v-row>
    </v-app-bar>

    <v-main
      class="align-center justify-center">
      <Sequencer/>
    </v-main>
  </v-app>
</template>

<script>
  import Sequencer from './components/Sequencer';
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'App',

    components: {
      Sequencer,
    },

    data: () => ({
      //
    }),

    computed: {
      ...mapState([
        'isRunning'
      ]),

      buttonText: (vm) => {
        if (vm.isRunning){
          return 'Stop';
        }
        else {
          return 'Play';
        }
      }
    },

    methods: {
      ...mapActions([
        'togglePlaying'
      ]),

      toggleState: function(){
        this.togglePlaying(!this.isRunning);
      },
    },

    mounted() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
    },
  };
</script>


<style lang="scss">

  * {
    box-sizing: border-box;
  }

</style>