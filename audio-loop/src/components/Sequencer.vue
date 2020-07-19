<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Play below {{currentStep}}</h1>
      </v-col>
    </v-row>

    <div class="d-flex flex-column">
      <v-card
        class="d-flex"
        v-for="r in numberOfTracks"
        :key="r">

        <label>{{r}}</label>

        <v-card v-for="(s, index) in numberOfSteps"
          :key="s">
          <v-switch
            :color="(currentStep == index ? 'success' : 'default')">{{s}}</v-switch>
        </v-card>
      </v-card>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'Sequencer',

    data: () => ({
      ticks: 0,
      numberOfTracks: 8,
      numberOfSteps: 8,
      interval: null
    }),

    computed: {
      currentStep: (vm) => {
        return vm.ticks % vm.numberOfSteps;
      }
    },

    mounted: function(){
      this.interval = setInterval (() => {
        this.ticks++;
      }, 1000)
    },

    destroyed() {
      clearInterval(this.interval);
    },
  }
</script>
