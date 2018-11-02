<template>
  <div>
    <draggable
        v-model="letters"
        @start="resetLetter">
      <transition-group> 
        <div
          :class="{ 'border-primary': letterIndex === index && isLetterFocused,
                    'bg-warning': letterIndex === index && isLetterSelected }"
          class="letter
           pb-1 border rounded shadow-sm 
           justify-content-center align-items-center
           text-lowercase font-weight-light"
          v-for="(element, index) in letters"
          :key="index">{{ element }}
        </div>
      </transition-group>
    </draggable>
   </div>  
</template>

<script>
import draggable from 'vuedraggable';

const STATE = {
  UNDEFINED: 0,
  FOCUSED: 1,
  SELECTED: 2,
  SUBMIT: 3
};

const KEYS = {
  SELECT: 'Space',
  TO_RIGHT: 'ArrowRight',
  TO_LEFT: 'ArrowLeft',
  SUBMIT: 'Enter'
};

const toArray = string => string.split('');
const toString = arr => arr.join('');

export default {
  components: {
    draggable
  },
  model: {
    prop: 'word',
    event: 'changed'
  },
  props: ['word', 'reset'],
  data() {
    return {
      letters: toArray(this.word),
      letterIndex: undefined,
      letterState: STATE.UNDEFINED
    };
  },
  computed: {
    isLetterFocused() {
      return this.letterState === STATE.FOCUSED;
    },
    isLetterSelected() {
      return this.letterState === STATE.SELECTED;
    }
  },
  methods: {
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
      this.letterIndex === undefined || this.letterIndex === this.letters.length - 1
        ? (this.letterIndex = 0)
        : (this.letterIndex += 1);
    },
    decreaseLetterIndex() {
      this.letterIndex === undefined || this.letterIndex === 0
        ? (this.letterIndex = this.letters.length - 1)
        : (this.letterIndex -= 1);
    },
    swapLetters(leftIndex, rightIndex) {
      if (leftIndex < 0) {
        leftIndex = this.letters.length - 1;
      }
      if (rightIndex > this.letters.length - 1) {
        rightIndex = 0;
      }
      const temp = this.letters[leftIndex];
      this.$set(this.letters, leftIndex, this.letters[rightIndex]);
      this.$set(this.letters, rightIndex, temp);
    },
    onSelectLetter() {
      switch (this.letterState) {
        case STATE.UNDEFINED: {
          return;
        }
        case STATE.FOCUSED: {
          this.letterState = STATE.SELECTED;
          break;
        }
        case STATE.SELECTED: {
          this.letterState = STATE.FOCUSED;
          break;
        }
        default: {
          throw Error('unknown letter state');
        }
      }
    },
    resetLetter() {
      this.letterState = STATE.UNDEFINED;
      this.letterIndex = undefined;
    },
    unsetUndefinedLetterState() {
      if (this.letterState === STATE.UNDEFINED) {
        this.letterState = STATE.FOCUSED;
      }
    },
    changed() {
      this.$emit('changed', toString(this.letters));
    },
    keyHandler(e) {
      switch (e.code) {
        case KEYS.SELECT: {
          this.onSelectLetter();
          break;
        }
        case KEYS.TO_RIGHT: {
          this.unsetUndefinedLetterState();
          this.onMoveRight();
          break;
        }
        case KEYS.TO_LEFT: {
          this.unsetUndefinedLetterState();
          this.onMoveLeft();
          break;
        }
        case KEYS.SUBMIT: {
          this.resetLetter();
          this.$emit('submit');
          break;
        }
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyHandler);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyHandler);
  },
  watch: {
    letters() {
      this.changed();
    },
    word() {
      this.letters = toArray(this.word);
    },
    reset() {
      this.resetLetter();
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

.border-primary {
  border-width: 2px !important;
}

[draggable='true'] {
  background: var(--warning);
}
</style>
