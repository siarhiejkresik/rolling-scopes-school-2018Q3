export default {
  props: ['createNewTaskTrigger'],
  methods: {
    generateNewTask() {
      throw new Error('method is not implemented!');
    }
  },
  watch: {
    isCorrectAnswer: function() {
      this.$parent.$emit('answerChanged', this.isCorrectAnswer);
    },
    createNewTaskTrigger: function() {
      this.generateNewTask();
    }
  },
  created() {
    this.generateNewTask();
  }
};
