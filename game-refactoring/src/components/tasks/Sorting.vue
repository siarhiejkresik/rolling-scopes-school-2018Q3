<template>
  <div>
    <h2 class="text-center">Цягні літары каб выйшла загаданае слова...</h2>
    <draggable
        class="draggable-container mt-5 mb-4 text-center"
        v-model="wordArray"
        @start="resetLetter">
      <transition-group> 
        <div
          :class="{ 'border-primary': letterIndex === index && isLetterFocused,
                    'bg-warning': letterIndex === index && isLetterSelected }"
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

const letterState = {
  undefined: 0,
  focused: 1,
  selected: 2
};

const keys = {
  select: 'Space',
  toRight: 'ArrowRight',
  toLeft: 'ArrowLeft'
};

export default {
  components: {
    draggable
  },
  mixins: [Mixin],
  data() {
    return {
      words: words,
      word: undefined,
      wordArray: undefined,
      letterIndex: undefined,
      letterState: letterState.undefined
    };
  },
  computed: {
    isCorrectAnswer() {
      return this.word !== undefined && this.wordArray.join('') === this.word;
    },
    isLetterFocused() {
      return this.letterState === letterState.focused;
    },
    isLetterSelected() {
      return this.letterState === letterState.selected;
    }
  },
  methods: {
    generateNewTask() {
      this.word = randomArrayElement(this.words);
      this.wordArray = this.word.split('').sort(() => 0.5 - Math.random());
      this.resetLetter();

      if (process.env.NODE_ENV !== 'production') {
        console.log('word:', this.word);
      }
    },
    onMoveLeft() {
      if (this.isLetterFocused) {
        this.decreaseLetterIndex();
      } else if (this.isLetterSelected) {
        this.swapLetters(this.letterIndex - 1, this.letterIndex);
        this.decreaseLetterIndex();
      }
    },
    onMoveRight() {
      if (this.isLetterFocused) {
        this.increaseLetterIndex();
      } else if (this.isLetterSelected) {
        this.swapLetters(this.letterIndex, this.letterIndex + 1);
        this.increaseLetterIndex();
      }
    },
    increaseLetterIndex() {
      this.letterIndex === undefined || this.letterIndex === this.wordArray.length - 1
        ? (this.letterIndex = 0)
        : (this.letterIndex += 1);
    },
    decreaseLetterIndex() {
      this.letterIndex === undefined || this.letterIndex === 0
        ? (this.letterIndex = this.wordArray.length - 1)
        : (this.letterIndex -= 1);
    },
    swapLetters(leftIndex, rightIndex) {
      if (leftIndex < 0) {
        leftIndex = this.wordArray.length - 1;
      }
      if (rightIndex > this.wordArray.length - 1) {
        rightIndex = 0;
      }
      const temp = this.wordArray[leftIndex];
      this.$set(this.wordArray, leftIndex, this.wordArray[rightIndex]);
      this.$set(this.wordArray, rightIndex, temp);
    },
    onSelectLetter() {
      switch (this.letterState) {
        case letterState.undefined: {
          return;
        }
        case letterState.focused: {
          this.letterState = letterState.selected;
          break;
        }
        case letterState.selected: {
          this.letterState = letterState.focused;
          break;
        }
        default: {
          throw Error('unknown letter state');
        }
      }
    },
    resetLetter() {
      this.letterState = letterState.undefined;
      this.letterIndex = undefined;
    },
    unsetUndefinedLetterState() {
      if (this.letterState === letterState.undefined) {
        this.letterState = letterState.focused;
      }
    },
    keyHandler(e) {
      switch (e.code) {
        case keys.select: {
          this.onSelectLetter();
          break;
        }
        case keys.toRight: {
          this.unsetUndefinedLetterState();
          this.onMoveRight();
          break;
        }
        case keys.toLeft: {
          this.unsetUndefinedLetterState();
          this.onMoveLeft();
          break;
        }
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyHandler);
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

.border-primary {
  border-width: 2px !important;
}

[draggable='true'] {
  background: var(--warning);
}
</style>
