<template>
    <div class="pagination-centered">
      <h2 class="text-center">Колькі будзе...</h2>
      <div class="operation mt-5 mb-5 text-center">
        {{ numbers.a }} {{ operation }} {{ numbers.b }} = {{ answerNumber }}
      </div>
      <b-form-input
        v-model="answer"
        type="text"
        size="lg"
        placeholder="прыклад адказу: 43"
        class="mt-3"></b-form-input>
    </div>  
</template>

<script>
import Mixin from './Mixin.js';
import { randomInt, randomObjectElement } from '../../scripts/utils.js';

const OPTIONS = {
  maxNumber: 999,
  maxDivMulNumbers: {
    a: 49,
    b: 20
  }
};

const OPERATIONS = {
  add: '+',
  sub: '-',
  mul: '×',
  div: '÷'
};

export default {
  mixins: [Mixin],
  data() {
    return {
      operation: undefined,
      answer: null
    };
  },
  computed: {
    answerNumber() {
      return this.answer ? this.answer : '?';
    },
    numbers() {
      let numbers;
      switch (this.operation) {
        case OPERATIONS.add:
        case OPERATIONS.sub:
          numbers = this.generateAddSubNumbers();
          break;
        case OPERATIONS.mul:
        case OPERATIONS.div:
          numbers = this.generateDivMulNumbers();
          break;
        // TODO:
        // default:
        //   console.log('this.operation', this.operation);
        //   throw new Error('unknow operation');
      }
      switch (this.operation) {
        case OPERATIONS.sub:
        case OPERATIONS.div:
          [numbers.a, numbers.result] = [numbers.result, numbers.a];
      }
      return numbers;
    },
    isCorrectAnswer() {
      return this.numbers !== undefined && Number(this.answer) === this.numbers.result;
    }
  },
  methods: {
    generateNewTask() {
      this.answer = null;
      this.operation = this.generateOperation();
    },
    generateOperation() {
      let operationNew = this.operation;
      // TODO: possible infinite loop
      while (this.operation === operationNew) {
        operationNew = randomObjectElement(OPERATIONS);
      }
      return operationNew;
    },
    generateAddSubNumbers() {
      const x = randomInt(OPTIONS.maxNumber) + 1;
      let y = x;
      // TODO: possible infinite loop
      while (y === x) {
        y = randomInt(OPTIONS.maxNumber - 1) + 1;
      }
      const a = Math.min(x, y);
      const sum = Math.max(x, y);
      const b = sum - a;
      return { a: a, b: b, result: sum };
    },
    generateDivMulNumbers() {
      const a = randomInt(OPTIONS.maxDivMulNumbers.a) + 1;
      const b = randomInt(OPTIONS.maxDivMulNumbers.b) + 1;
      const mul = a * b;
      return { a: a, b: b, result: mul };
    }
  }
};
</script>

<style scoped>
.operation {
  font-size: 3em;
}
</style>
