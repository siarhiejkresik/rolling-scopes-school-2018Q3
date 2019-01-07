<template>
  <div class="container">
    <div class="name">
      ІМЯ: {{ name }}
    </div>
    <div class="health">
      ЖЫЦЦЁ: {{ health }}
    </div>
    <b-progress
      height="10px"
      :variant="healthBarColorVariant"
      :value="health"
      :max="healthMax"
      :class="{ 'flip-vertical': isRight,
                'critical-pulse': isCriticalHelth}"
      class="health-bar w-75"
    />
  </div>
</template>

<script>
const HEALTH = {
  NORMAL: {
    part: 0.4,
    style: 'info',
  },
  LOW: {
    part: 0.25,
    style: 'warning',
  },
  CRITICAL: {
    part: 0,
    style: 'danger',
  },
};

export default {
  props: ['name', 'health', 'healthMax', 'isRight'],
  computed: {
    healthBarColorVariant() {
      const part = this.health / this.healthMax;
      if (part > HEALTH.NORMAL.part) {
        return HEALTH.NORMAL.style;
      } if (part > HEALTH.LOW.part) {
        return HEALTH.LOW.style;
      }
      return HEALTH.CRITICAL.style;
    },
    isCriticalHelth() {
      const part = this.health / this.healthMax;
      return part > 0 && part <= HEALTH.LOW.part;
    },
  },
};
</script>

<style scoped>
.container {
  color: white;
  font-size: 20px;
  text-shadow: 0 1px 1px rgba(0,0,0,.12);
}

.health-bar {
  display: inline-flex;
}

.flip-vertical {
  transform: scaleX(-1);
}

.critical-pulse {
  animation: critical-pulse infinite 1.5s ease-in-out;
}

@keyframes critical-pulse {
  0% {
    box-shadow: 0 0 15px 0px var(--danger);
  }
  100% {
    box-shadow: 0 0 0px 0px var(--danger);
  }
}
</style>
