<template>
  <div>
    <modal
      v-model="show"
      hascancel=true
      title='LOREM IPSUM'
      @ok="onOk"
      @cancel="onCancel">
        {{ lorem }}
    </modal> 
    
    <div class="d-flex flex-column m-auto align-items-center">
      <b-button
        class="m-3"
        @click="showModal">Show</b-button>
      <div v-if="!show" class="m-1">{{ event }}</div>
    </div>

  </div>
</template>

<script>
import { LOREM } from './constants.js';

export default {
  data: function() {
    return {
      show: false,
      event: '',
      lorem: LOREM
    };
  },
  methods: {
    showModal() {
      this.show = !this.show;
      this.event = '';
    },
    onOk() {
      this.event = 'ok pressed';
    },
    onCancel() {
      this.event = 'cancel pressed';
    }
  }
};
</script>
