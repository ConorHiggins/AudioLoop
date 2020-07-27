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
        <v-slider
          v-model="playbackSpeed"
          hide-details
          min="50"
          max="2000"
          label="Speed"
          class="ml-auto mr-4 speed-slider"/>

        <v-btn
          color="dark"
          class="mx-4"
          @click="toggleState">
          {{buttonText}}
        </v-btn>

        <v-btn
          color="dark"
          class="mr-8"
          @click="onClickReset">
          Reset
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

    computed: {
      ...mapState([
        'isRunning',
        'speed',
      ]),

      playbackSpeed: {
        set(s) {
          this.$store.commit('updateSpeed', s);
        },
        get() {
          return this.speed;
        }
      },

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
        'togglePlaying',
        'reset',
        'initTracks',
        'updateSpeed',
      ]),

      toggleState: function(){
        this.togglePlaying(!this.isRunning);
      },

      onClickReset: function(){
        this.reset();
        this.$root.$emit('reset');
      },

      updateSpeedVar: function(){
        document.documentElement.style.setProperty('--speed', `${this.speed/1000}s`);
      }
    },

    mounted() {
      this.initTracks();
      this.updateSpeedVar();
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
    },

    watch: {
      speed() {
        this.updateSpeedVar();
      }
    }
  };
</script>


<style lang="scss">
  * {
    box-sizing: border-box;
  }

  :root {
    --speed: .5s;
  }

  .speed-slider {
    max-width: 240px;
  }
</style>