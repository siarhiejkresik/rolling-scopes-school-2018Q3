<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  props: ['runAnimationTrigger', 'animation', 'verticalAxis'],
  computed: {
    ctx: function() {
      return this.$refs.canvas.getContext('2d');
    }
  },
  methods: {
    playAnimation() {
      this.animation(this.ctx, this.verticalAxis);
    }
  },
  watch: {
    runAnimationTrigger: function() {
      this.playAnimation();
    }
  }
};
</script>