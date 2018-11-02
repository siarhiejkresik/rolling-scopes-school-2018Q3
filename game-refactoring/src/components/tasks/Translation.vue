<template>
    <div>
      <h2 class="text-center">Як будзе па-беларуску...</h2>
      <div class="mt-5 mb-5 text-center font-weight-bold h1">{{ word }}</div>
      <b-form-input
        v-model="answer"
        type="text"
        size="lg"
        placeholder="прыклад адказу: мама"
        class="mt-3"
        ref="inputs"></b-form-input>
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
      translations: translations,
      answer: null,
      word: undefined
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
      this.answer = null;
      this.word = randomArrayElement(Object.keys(this.translations));
    }
  }
};
</script>