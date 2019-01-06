<template>
  <div>
    <h2 class="text-center">
      Напішы пераклад пачутага...
    </h2>
    <b-button
      size="lg"
      class="play mx-auto mt-5 mb-5"
      @click="sayWord"
    >
      {{ isFirstPlay ? 'Праслухаць' :'Паўтарыць' }}
    </b-button>
    <b-form @submit="sendAnswerReady">
      <b-form-input
        v-model="answer"
        type="text"
        size="lg"
        placeholder="прыклад адказу: мама"
        autocomplete="off"
        spellcheck="false"
        class="mt-3"
      />
    </b-form>
  </div>
</template>

<script>
import Mixin from './Mixin';
import { randomArrayElement } from '../../scripts/utils';

import translations from '../../assets/data/translations.json';

export default {
  mixins: [Mixin],
  data() {
    return {
      lang: 'en-GB',
      isFirstPlay: true,
      answer: null,
      word: undefined,
    };
  },
  computed: {
    correctAnswers() {
      return translations[this.word];
    },
    isCorrectAnswer() {
      return this.word !== undefined && this.correctAnswers.includes(this.answer);
    },
  },
  methods: {
    generateNewTask() {
      this.word = randomArrayElement(Object.keys(translations));
    },
    sayWord() {
      this.isFirstPlay = false;
      const utterance = new SpeechSynthesisUtterance(this.word);
      utterance.lang = this.lang;
      window.speechSynthesis.speak(utterance);
    },
  },
};
</script>

<style scoped>
.play {
  display: block;
}
</style>
