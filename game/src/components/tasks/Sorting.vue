<template>
  <div>
    <h2 class="text-center">
      Цягні літары каб выйшла загаданае слова...
    </h2>
    <draggable
      v-model="answer"
      class="mt-5 mb-4 text-center"
      @submit="sendAnswerReady"
    />
  </div>
</template>

<script>
import Mixin from './Mixin';
import draggable from '../Draggable.vue';
import { randomArrayElement } from '../../scripts/utils';

import words from '../../assets/data/words.json';

export default {
  components: {
    draggable,
  },
  mixins: [Mixin],
  data() {
    return {
      word: undefined,
      answer: undefined,
    };
  },
  computed: {
    isCorrectAnswer() {
      return this.word !== undefined && this.answer === this.word;
    },
  },
  methods: {
    generateNewTask() {
      this.word = randomArrayElement(words);
      this.answer = this.word
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');

      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log('word:', this.word);
      }
    },
  },
};
</script>
