<template>
  <div
    :class="[
      'sequencer__track', {
        'sequencer__track--disabled': !enabled
      }
    ]">
    <v-switch
      v-model="enabled"
      inset
      class="mx-4"/>

    <div
      v-for="(step, index) in steps"
      :key="index">
      <Step
        :step="step"
        :index="index"
        :position="position"/>
    </div>
  </div>
</template>

<script>
  import Step from '../components/Step'

  export default {
    name: 'Track',

    props: [
      'numberOfSteps',
      'track',
      'position',
      'audioCtx'
    ],

    data: () => {
      return {
        enabled: true,
        volume: 10,
        audioSrc: null
      }
    },

    components: {
      Step
    },

    computed: {
      steps: (vm) => {
        console.log("steps count is:", vm.numberOfSteps, vm);
        let arr = Array.from(Array(vm.numberOfSteps).keys());

        return arr.map(() => {
          return {
            active: false,
          }
        });
      }
    },

    mounted() {
      const request = new XMLHttpRequest();
      this.audioSrc = this.audioCtx.createBufferSource();

      request.open('GET', this.track.source, true);
      request.responseType = 'arraybuffer';

      let ctx = this.audioCtx;
      let src = this.audioSrc;

      let onSuccess = function(buffer) {
        src.buffer = buffer;
        src.connect(ctx.destination);
      }

      let onError = function(e){
        console.log("Error with decoding audio data" + e.err);
      }

      request.onload = function() {
        const audioData = request.response;
        ctx.decodeAudioData(audioData, onSuccess, onError);
      }
      console.log('now make the request!');
      request.send();
    },

    watch: {
      position: function (currentPosition) {
        if (currentPosition == 0) {
          console.log('restart');
        }

        if (this.steps[currentPosition]['active']){
          console.log('this ones playing!', this.track.source);

          this.audioSrc.start(0);
        }
      }
    },
  }
</script>
