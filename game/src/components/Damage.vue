<template>
  <transition name="damage-animation">
    <div
      class="damage"
      :style="{
        left: verticalAxis-size/2+'px',
        top: horizontalAxis+'px',
        fontSize: size+'px'}"
    >
      {{ damage }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    damage: Number,
    verticalAxis: Number,
    horizontalAxis: Number,
  },
  data() {
    return {
      size: 70, // font-size
    };
  },
};
</script>

<style scoped>
.damage {
  position: absolute;
  font-weight: 300;
  color: var(--red);
  text-shadow: 0 0 10px var(--gray);
  opacity: 0;
  user-select: none;
}

.damage-animation-enter-active {
  animation: damage 5s;
}

@keyframes damage {
  0% {
    transform: scale(0) translate(0, 0);
    opacity: 1;
  }
  8% {
    transform: scale(1.7) translate(0, 0);
    opacity: 1;
  }
  16% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1) translate(0, -200px);
    opacity: 0;
  }
}
</style>
