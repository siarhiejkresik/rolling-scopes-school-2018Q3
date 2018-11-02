<template>
  <div>
    <h2 class="text-center">Цягні літары каб выйшла загаданае слова...</h2>
    <draggable
      class="mt-5 mb-4 text-center"
      v-model="answer"
      @submit="sendAnswerReady">
    </draggable>
   </div>  
</template>

<script>
import Mixin from './Mixin.js';
import draggable from './Draggable.vue';
import { randomArrayElement } from '../../scripts/utils.js';

import words from '../../assets/data/words.json';

export default {
  components: {
    draggable
  },
  mixins: [Mixin],
  data() {
    return {
      word: undefined,
      answer: undefined
    };
  },
  computed: {
    isCorrectAnswer() {
      return this.word !== undefined && this.answer === this.word;
    }
  },
  methods: {
    generateNewTask() {
      this.word = randomArrayElement(words);
      this.answer = this.word
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');

      if (process.env.NODE_ENV !== 'production') {
        console.log('word:', this.word);
      }
    }
  }
};
</script>