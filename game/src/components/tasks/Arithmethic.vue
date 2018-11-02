<template>
    <div class="pagination-centered">
      <h2 class="text-center">Колькі будзе...</h2>
      <div class="operation m-3 text-center"><span>{{ numbers.a }}</span> {{ operation }} {{ numbers.b }} = {{ answerNumber }}</div>
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
      operations: ['+', '-', '×', '÷'],
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
        case '+':
        case '-':
          numbers = this.generateAddSubNumbers();
          break;
        case '×':
        case '÷':
          numbers = this.generateDivMulNumbers();
          break;
      }
      switch (this.operation) {
        case '-':
        case '÷':
          [numbers.a, numbers.result] = [numbers.result, numbers.a];
      }
      return numbers;
    },
    isCorrectAnswer() {
      return this.numbers && Number(this.answer) === this.numbers.result;
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
        operationNew = randomArrayElement(this.operations);
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
