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
export default {
  props: ['name', 'health', 'healthMax', 'isRight'],
  computed: {
    healthBarColorVariant() {
      const part = this.health / this.healthMax;
      if (part > 0.40) {
        return 'info';
      } else if (part > 0.25) {
        return 'warning';
      }
      return 'danger';
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


