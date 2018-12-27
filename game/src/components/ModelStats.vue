<template>
  <div class="container">
    <div class="name">ІМЯ: {{ name }}</div>
    <div class="health">ЖЫЦЦЁ: {{ health }}</div>
    <b-progress
      height="10px"
      :variant="healthBarColorVariant"
      :value="health"
      :max="healthMax"
      :class="{ 'flip-vertical': isRight }"
      class="health-bar w-75"></b-progress>
  </div>
</template>

<script>
const HEALTH = {
  NORMAL: {
    part: 0.4,
    style: 'info'
  },
  LOW: {
    part: 0.25,
    style: 'warning'
  },
  CRITICAL: {
    part: 0,
    style: 'danger'
  }
};

export default {
  props: ['name', 'health', 'healthMax', 'isRight'],
  computed: {
    healthBarColorVariant() {
      const part = this.health / this.healthMax;
      if (part > HEALTH.NORMAL.part) {
        return HEALTH.NORMAL.style;
      } else if (part > HEALTH.LOW.part) {
        return HEALTH.LOW.style;
      }
      return HEALTH.CRITICAL.style;
    }
  }
};
</script>

<style scoped>
.container {
  color: white;
  font-size: 20px;
}

.health-bar {
  display: inline-flex;
}

.flip-vertical {
  transform: scaleX(-1);
}
</style>


