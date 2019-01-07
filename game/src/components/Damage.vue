<template>
  <transition name="damage-animation">
    <div
      class="damage display-3"
      :style="{
        left: verticalAxis-size/2+'px',
        top: horizontalAxis+'px'}"
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
      size: 60,
    };
  },
};
</script>

<style scoped>
.damage {
  --shadow-color: white;
  position: absolute;
  font-weight: 300;
  color: #e60073;
    text-shadow: 0 0 30px var(--shadow-color),
    0 0 40px var(--shadow-color);
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
    transform: scale(1) translate(0, -100px);
    opacity: 0;
  }
}
</style>
