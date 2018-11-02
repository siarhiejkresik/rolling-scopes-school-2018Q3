export default {
  computed: {
    isCorrectAnswer() {
      throw new Error('computed property is not implemented!');
    }
  },
  methods: {
    generateNewTask() {
      throw new Error('method is not implemented!');
    },
    sendIsCorrectAnswer() {
      this.$emit('answerChanged', this.isCorrectAnswer);
    },
    sendAnswerReady(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.$emit('answerReady');
    }
  },
  watch: {
    isCorrectAnswer: function() {
      this.sendIsCorrectAnswer();
    }
  },
  created() {
    this.generateNewTask();
    this.sendIsCorrectAnswer();
  }
};
