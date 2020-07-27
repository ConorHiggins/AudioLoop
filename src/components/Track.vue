<template>
  <div
    :class="[
      'track', {
        'track--disabled': !enabled
      }
    ]">
    <v-switch
      v-model="enabled"
      inset
      color="deep-purple"
      class="mx-4"/>

    <div
      v-for="(step, index) in steps"
      :key="index">
      <Step
        :step="step"
        :index="index"
        :position="position"/>
    </div>

    <v-slider
      v-model="track.volume"
      hide-details
      min="0"
      max="100"
      track-color="deep-purple lighten-5"
      color="deep-purple"
      class="mx-4 track__slider"
    ></v-slider>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Step from '../components/Step'

  export default {
    name: 'Track',

    props: {
      track: Object,
      position: Number,
      audioCtx: null
    },

    data: () => {
      return {
        enabled: true,
        volume: 10,
        audioSrc: null,
        audioBuffer: null,
        gainNode: null
      }
    },

    components: {
      Step
    },

    computed: {
      ...mapState([
        'numberOfSteps'
      ]),

      steps: (vm) => {
        let arr = Array.from(Array(vm.numberOfSteps).keys());

        return arr.map(() => {
          return {
            active: false,
          }
        });
      },

      currentVolume: (vm) => {
        return (vm.track.volume / 100);
      }
    },

    mounted() {
      this.loadSound();
      this.$root.$on('reset', this.resetTrack);
    },

    watch: {
      position(currentPosition) {
        if (this.steps[currentPosition]['active']){
          this.playSound()
        }
      },

      currentVolume(vol) {
        this.gainNode.gain.value = vol;
      }
    },

    methods: {
      loadSound(){
        let self = this;
        let ctx = self.audioCtx;

        const request = new XMLHttpRequest();
        request.open('GET', self.track.source, true);
        request.responseType = 'arraybuffer';

        self.gainNode = ctx.createGain();
        self.gainNode.gain.value = self.currentVolume;

        const onSuccess = function(buffer) {
          self.audioBuffer = buffer;
        }

        const onError = function(e){
          console.log("Error with decoding audio data" + e.err, e);
        }

        request.onload = function() {
          const audioData = request.response;
          ctx.decodeAudioData(audioData, onSuccess, onError);
        }
        request.send();
      },

      resetTrack(){
        this.enabled = true;
      },

      playSound(){
        if (this.enabled && this.audioBuffer){
          const ctx = this.audioCtx;
          let src = this.audioSrc;
          src = ctx.createBufferSource(); // creates a sound source
          src.buffer = this.audioBuffer;                    // tell the source which sound to play
          // src.connect(ctx.destination);       // connect the source to the context's destination (the speakers)
          src.connect(this.gainNode);
          this.gainNode.connect(ctx.destination);
          src.start(0);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/colors";
  @import "../styles/mixins";

  .track {
    @include flexIt;
    margin-bottom: 8px;

    &--disabled {
      opacity: .3;
    }
  }

  .track__slider {
    width: 160px;
  }
</style>