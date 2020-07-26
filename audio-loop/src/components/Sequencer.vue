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
          :numberOfSteps="numberOfSteps"
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
      numberOfSteps: 8,
      interval: null,
      tracks: [
        {
          source: '../assets/audio/1.wav'
        },
        {
          source: '../assets/audio/2.wav'
        },
        {
          source: '../assets/audio/3.wav'
        },
        {
          source: '../assets/audio/4.wav'
        },
        {
          source: '../assets/audio/5.wav'
        },
        {
          source: '../assets/audio/6.wav'
        },
        {
          source: '../assets/audio/7.wav'
        },
        {
          source: '../assets/audio/8.wav'
        },
      ]
    }),

    components: {
      Track,
    },

    computed: {

      ...mapState([
        'isRunning'
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
        }, 1000);
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
      isRunning: function(newValue) {
        console.log('updated to ', newValue);

        if (newValue){
          this.startPlaying();
        }
        else {
          this.stopPlaying();
        }
      }
    },

    destroyed() {
      clearInterval(this.interval);
    },
  }
</script>

<style lang="scss">
  @mixin flexIt($align: center, $justify: baseline) {
    display: flex;
    align-items: $align;
    justify-content: $justify;
  }

  $base: ".sequencer";

  .sequencer {
    @include flexIt;
    flex-direction: column;
  }

  #{$base}__track {
    @include flexIt;

    &--disabled {
      opacity: .3;
      cursor: not-allowed;

      #{$base}__step {
        pointer-events: none;
      }
    }
  }

  #{$base}__step {
    @include flexIt(center, center);
    border-radius: 50%;
    cursor: pointer;
    border: 4px solid #0100ca;
    background-color: #eee;
    width: 40px;
    height: 40px;
    margin: 10px;
    position: relative;

    &:hover {
      background-color: #0100ca;
    }

    &--active {
      background-color: #651fff;
    }

    &--current {
      &:after {
        content: ' ';
        position: absolute;
        top: -20px;
        bottom: -20px;
        width: 4px;
        background-color: #ff1744;
        border-radius: 3px;
        // border-bottom-right-radius: 3px;
        // border-bottom-left-radius: 3px;
        // border-bottom-right-radius: 3px;
      }
    }
  }
</style>