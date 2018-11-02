<template>
  <div>
    <h2 class="text-center">Цягні літары каб выйшла загаданае слова...</h2>
    <draggable
        class="draggable-container mt-5 mb-4 text-center"
        v-model="wordArray"
        @start="drag=true"
        @end="drag=false">
      <transition-group> 
        <div
          class="letter
           pb-1 border rounded shadow-sm 
           justify-content-center align-items-center
           text-lowercase font-weight-light"
          v-for="(element, index) in wordArray"
          :key="index">{{element}}
        </div>
      </transition-group>
    </draggable>
   </div>  
</template>

<script>
import Mixin from './Mixin.js';
import { randomArrayElement } from '../../scripts/utils.js';
import words from '../../assets/data/words.json';

import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  mixins: [Mixin],
  data() {
    return {
      words: words,
      word: undefined,
      wordArray: undefined
    };
  },
  computed: {
    isCorrectAnswer() {
      return this.word !== undefined && this.wordArray.join('') === this.word;
    }
  },
  methods: {
    generateNewTask() {
      this.word = randomArrayElement(this.words);
      this.wordArray = this.word.split('').sort(() => 0.5 - Math.random());
      if (process.env.NODE_ENV !== 'production') {
        console.log('word:', this.word)
      }
    }
  }
};
</script>

<style scoped>
.letter {
  height: 80px;
  width: 80px;
  margin: 5px;
  font-size: 50px;
  display: inline-flex;
  user-select: none;
}
</style>
