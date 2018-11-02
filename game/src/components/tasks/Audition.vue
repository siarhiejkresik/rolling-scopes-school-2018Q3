<template>
    <div>
      <h2 class="text-center">Напішы пераклад пачутага...</h2>
      <b-button
        size="lg"
        @click="sayWord"
        class="play mx-auto mt-5 mb-5">{{ played ? 'Паўтарыць' : 'Праслухаць' }}</b-button>
      <b-form-input
        v-model="answer"
        type="text"
        size="lg"
        placeholder="прыклад адказу: мама"
        class="mt-3"></b-form-input>
    </div>  
</template>

<script>
import Mixin from './Mixin.js';
import { randomArrayElement } from '../../scripts/utils.js';
import translations from '../../assets/data/translations.json';

export default {
  mixins: [Mixin],
  data() {
    return {
      lang: 'en-GB',
      translations: translations,
      answer: null,
      word: undefined,
      played: false
    };
  },
  computed: {
    correctAnswers() {
      return this.translations[this.word];
    },
    isCorrectAnswer() {
      return this.word !== undefined && this.correctAnswers.includes(this.answer);
    }
  },
  methods: {
    generateNewTask() {
      this.played = false;
      this.answer = null;
      this.word = randomArrayElement(Object.keys(this.translations));
    },
    sayWord() {
      this.played = true;
      const utterance = new SpeechSynthesisUtterance(this.word);
      utterance.lang = this.lang;
      window.speechSynthesis.speak(utterance);
    }
  }
};
</script>

<style scoped>
.play {
  display: block;
}
</style>


