<template>
  <v-container>
    <v-row class="d-flex flex-column align-center"
      v-if="audioCtx">

      <div class="sequencer__playhead"></div>

      <div
        v-for="(track, index) in tracks"
        :key="index">
        <Track
          :track="track"
          :audioCtx="audioCtx"
          :position="currentStep"/>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  import Track from '../components/Track'
  import { mapState } from 'vuex'

  export default {
    name: 'Sequencer',

    data: () => ({
      audioCtx: null,
      ticks: 0,
      interval: null,
    }),

    components: {
      Track,
    },

    computed: {
      ...mapState([
        'isRunning',
        'tracks',
        'numberOfSteps',
        'speed'
      ]),

      currentStep: (vm) => {
        return vm.ticks % vm.numberOfSteps;
      },

      buttonText: (vm) => {
        if (vm.isRunning) {
          return "Stop"
        }
        else {
          return "Start"
        }
      }
    },

    methods: {
      startPlaying: function(){
        this.ticks = 0;
        this.interval = setInterval (() => {
          this.ticks++;
        }, this.speed);
      },

      stopPlaying: function(){
        this.ticks = 0;
        clearInterval(this.interval);
      }
    },

    mounted: function(){
      this.audioCtx = new AudioContext();
      console.log("now creating it!", this.audioCtx);
    },

    watch: {
      isRunning(newValue) {
        console.log('updated to ', newValue);

        if (newValue){
          this.startPlaying();
        }
        else {
          this.stopPlaying();
        }
      },

      speed(){
        if (this.isRunning){
          clearInterval(this.interval);
          this.startPlaying();
        }
      }
    },

    destroyed() {
      clearInterval(this.interval);
    },
  }
</script>

<style lang="scss">
  @import "../styles/colors";
  @import "../styles/mixins";

  .sequencer {
    @include flexIt;
    flex-direction: column;
  }
</style>