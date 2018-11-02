<template>
    <div class="pagination-centered">
      <h2 class="text-center">Колькі будзе...</h2>
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

export default {
  mixins: [Mixin],
  data() {
    return {
      options: {
        maxNumber: 999,
        maxDivMulNumbers: {
          a: 49,
          b: 20
        }
      },
      operations: {
        add: '+',
        sub: '-',
        mul: '×',
        div: '÷'
      },
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
        case this.operations.add:
        case this.operations.sub:
          numbers = this.generateAddSubNumbers();
          break;
        case this.operations.mul:
        case this.operations.div:
          numbers = this.generateDivMulNumbers();
          break;
        // TODO:
        // default:
        //   console.log('this.operation', this.operation);
        //   throw new Error('unknow operation');
      }
      switch (this.operation) {
        case this.operations.sub:
        case this.operations.div:
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
        operationNew = randomObjectElement(this.operations);
      }
      return operationNew;
    },
    generateAddSubNumbers() {
      const x = randomInt(this.options.maxNumber) + 1;
      let y = x;
      // TODO: possible infinite loop
      while (y === x) {
        y = randomInt(this.options.maxNumber - 1) + 1;
      }
      const a = Math.min(x, y);
      const sum = Math.max(x, y);
      const b = sum - a;
      return { a: a, b: b, result: sum };
    },
    generateDivMulNumbers() {
      const a = randomInt(this.options.maxDivMulNumbers.a) + 1;
      const b = randomInt(this.options.maxDivMulNumbers.b) + 1;
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
