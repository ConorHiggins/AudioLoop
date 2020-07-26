<template>
  <button :class="['sequencer__step', {
    'sequencer__step--active': isActive,
    'sequencer__step--current': isCurrent,
  }]"
    @click="ToggleStep">
  </button>
</template>

<script>
  export default {
    name: 'Step',

    props: [
      'step',
      'index',
      'position'
    ],

    data: () => {
      return {
        isActive: false
      }
    },

    computed: {
      isCurrent: (vm) => {
        return (vm.index == vm.position);
      },
    },

    methods: {
      ToggleStep: function() {
        console.log('is it active test poopopkkopkop?', this.step.active, this.index);
        // this.step.active = !this.step.active;
        this.isActive = !this.isActive;
        this.step.active = this.isActive;
      }
    },
  }
</script>
