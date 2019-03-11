<template>
  <transition
    :enter-active-class="animationInClass"
    :leave-active-class="animationOutClass"
  >
    <div
      class="game-message text-center"
      :class="[displayClass]"
    >
      {{ opts.message }}
    </div>
  </transition>
</template>

<script>
const DISPLAY_CLASSES = {
  small: 4,
  normal: 3,
  bigger: 2,
  big: 1,
};

const DEFAULT_OPTIONS = {
  message: '',
  size: 'small',
  time: 2500,
  animationIn: 'fadeInDownBig',
  animationOut: 'fadeOut',
};

const animatedClass = animationClasses => `animated ${animationClasses}`;

export default {
  props: {
    options: {
      type: Object,
      default() {
        return DEFAULT_OPTIONS;
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    opts() {
      const r = { ...DEFAULT_OPTIONS, ...this.options };
      return r;
    },
    displayClass() {
      const size = DISPLAY_CLASSES[this.opts.size];
      return `display-${size}`;
    },
    animationInClass() {
      return animatedClass(this.opts.animationIn);
    },
    animationOutClass() {
      return animatedClass(this.opts.animationOut);
    },
  },
};
</script>

<style scoped>
.game-message {
  --shadow-color: #e60073;
  position: absolute;
  left: 10%;
  right: 10%;
  top: 40%;
  bottom: 10%;
  color: white;
  user-select: none;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 20px #fff, 0 0 30px var(--shadow-color),
    0 0 40px var(--shadow-color);
}
</style>
