<template>
  <b-modal
      ok-title="Адказаць" cancel-title="Здацца" cancel-variant="danger"
      :no-close-on-backdrop=true
      :no-close-on-esc=true
      :hide-header-close=true
      :centered=true
      :title="status.title" 
      :header-bg-variant="status.headerBg"
      :header-text-variant="status.headerText"
      :busy="status.busy"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      ref="modal">
    <component
      :is="task"
      @answerChanged="onAnswerChanged"
      @answerReady="onAnswerReady">
    </component>
  </b-modal>
</template>

<script>
import { pause } from '../scripts/utils.js';

const SHOW_ANSWER_DURATION = 2000;
const HIDE_MODAL_DURATION = 1000;

const STATUSES = {
  SUCCESS: {
    headerBg: 'success',
    headerText: 'light',
    title: 'Правільна!',
    busy: true
  },
  FAIL: {
    headerBg: 'danger',
    headerText: 'light',
    title: 'Няправільна!',
    busy: true
  },
  NEUTRAL: {
    headerBg: 'info',
    headerText: 'light',
    title: 'Заданне',
    busy: false
  }
};

export default {
  model: {
    prop: 'task',
    event: 'taskToUndefined'
  },
  props: ['task'],
  data: function() {
    return {
      isCorrectAnswer: undefined,
      status: STATUSES.NEUTRAL
    };
  },
  methods: {
    onAnswerChanged(value) {
      this.isCorrectAnswer = value;
    },
    onAnswerReady() {
      this.processAndSendAnswer(this.isCorrectAnswer);
    },
    handleModalOk(evt) {
      evt.preventDefault();
      this.processAndSendAnswer(this.isCorrectAnswer);
    },
    handleModalCancel(evt) {
      evt.preventDefault();
      this.processAndSendAnswer(false);
    },
    async processAndSendAnswer(taskResult) {
      this.setStatus(taskResult);
      await pause(SHOW_ANSWER_DURATION);
      this.hideModal();
      await pause(HIDE_MODAL_DURATION);
      this.reset();
      this.$emit('taskResult', taskResult);
    },
    setStatus(taskResult) {
      if (taskResult) {
        this.status = STATUSES.SUCCESS;
      } else {
        this.status = STATUSES.FAIL;
      }
    },
    reset() {
      this.isCorrectAnswer = undefined;
      this.status = STATUSES.NEUTRAL;
      /* Set task value to undefined to destroy html of the current task in the dom
        by propagating this value to a parent component via v-model mechanism. */
      this.$emit('taskToUndefined', undefined);
    },
    showModal() {
      this.$refs.modal.show();
    },
    hideModal() {
      this.$refs.modal.hide();
    }
  },
  watch: {
    task: function() {
      if (this.task) {
        this.showModal();
      }
    }
  }
};
</script>

