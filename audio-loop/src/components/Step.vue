<template>
  <button :class="['step', {
    'step--active': isActive,
    'step--current': isCurrent,
  }]"
    @click="ToggleStep">
  </button>
</template>

<script>
  export default {
    name: 'Step',

    props: {
      'step': Object,
      'index': Number,
      'position': Number,
    },

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
        this.isActive = !this.isActive;
        this.step.active = this.isActive;
      },

      resetStep: function(){
        this.isActive = false;
        this.step.active = false;
      }
    },

    mounted() {
      this.$root.$on('reset', this.resetStep)
    },
  }
</script>

<style lang="scss" scoped>
  @import "../styles/colors";
  @import "../styles/mixins";

  $height--step: 40px;
  $width--step: 56px;

  .step {
    @include flexIt(center, center);
    cursor: pointer;
    border-radius: 4px;
    background-color: $color--step;
    width: $width--step;
    height: $height--step;
    margin: 0 2px;
    position: relative;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: $color--step-hover;
    }

    &--active {
      background-color: $color--step-active;

      &:hover {
        background-color: darken($color--step-active, 10%);
      }
    }

    &--current {
      &:after {
        content: ' ';
        position: absolute;
        top: -($height--step/2);
        bottom: -($height--step/2);
        width: 4px;
        background-color: $color--playhead;
        border-radius: 3px;
      }
    }

    &--active#{&}--current {
      animation: swell var(--speed) ease-in-out both;
    }
  }

  @keyframes swell {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>>