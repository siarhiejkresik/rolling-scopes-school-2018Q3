<template>
  <div>
    <h2 class="text-center">
      Як будзе па-беларуску...
    </h2>
    <div class="mt-5 mb-5 text-center font-weight-bold h1">
      {{ word }}
    </div>
    <b-form @submit="sendAnswerReady">
      <b-form-input
        ref="inputs"
        v-model="answer"
        type="text"
        size="lg"
        placeholder="прыклад адказу: мама"
        autocomplete="off"
        spellcheck="false"
        class="mt-3"
        autofocus
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
  },
};
</script>
