<template>
  <section class="main">
    <section class="top">
        <h1>Гульня ў словы</h1>
        <b-button
          size="lg" 
          variant="success" 
          class="pulse" 
          @click="$emit('startGame')">Пачаць</b-button>
        <div>Праверым, ці добра ты знаеш беларускія словы?</div>
        <b-button
          variant="link"
          @click="$emit('showScores')">Дасягненні</b-button>
    </section>

    <section>
      <h2>
        Выявы
      </h2> 
      <carousel></carousel>
    </section>

    <section>
      Зроблена:
    </section>
  </section>
</template>

<script>
import Carousel from './Carousel.vue';

export default {
  components: {
    Carousel
  },
  data() {
    return {
      view: 'LANDING'
    };
  },
  methods: {}
};
</script>

<style scoped>
.main {
  outline: 3px red dotted;
}
.top {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  height: 150px;
  justify-items: center;
  align-items: center;
}

h1 {
  font-size: 70px;
}

@keyframes greenPulse {
  from {
    opacity: 0.8;
    box-shadow: 0 0 19px #2ef13e;
  }
  40% {
    opacity: 1;
    box-shadow: 0 0 40px 5px #09bd18;
  }
  to {
    opacity: 0.8;
    box-shadow: 0 0 19px #2ef13e;
  }
}

.pulse {
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-name: greenPulse;
}
</style>
