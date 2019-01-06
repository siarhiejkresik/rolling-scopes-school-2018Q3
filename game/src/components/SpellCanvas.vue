<template>
  <canvas ref="canvas" />
</template>

<script>
export default {
  props: ['runAnimationTrigger', 'animation', 'verticalAxis'],
  computed: {
    ctx() {
      return this.$refs.canvas.getContext('2d');
    },
  },
  watch: {
    runAnimationTrigger() {
      this.playAnimation();
    },
  },
  methods: {
    playAnimation() {
      this.animation(this.ctx, this.verticalAxis);
    },
  },
};
</script>
