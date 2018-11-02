/* A simple modal component. It includes the modal header, modal body and modal footer.

Click the modal mask or close button to dismiss the modal.

Properties:
title: set a header slot message
hascancel: don't show the cancel button
 */

<template>
  <transition name="modal-fade">
    <div
        v-show=show
        @click="close"
        class="modal-mask">
      <div @click.stop class="modal-body d-flex flex-column bg-light p-0 rounded shadow-lg">

        <header class="d-flex flex-row justify-content-between align-items-center bg-info p-3 h-3 text-light rounded-top">
          <slot name="header">
            <h4>{{ title }}</h4>
          </slot>
          <button class="close" @click="close">×</button>
        </header>
        
        <main class="p-3">
          <slot></slot>
        </main>
        
        <footer class="d-flex flex-row justify-content-end p-3 border-top">
          <slot name="footer">
            <b-button
              @click="ok"
              class="ml-1 m2-2">Ok</b-button>
            <b-button
              v-if="hascancel"
              @click="cancel"
              class="ml-2 m2-2">Cancel</b-button>
          </slot>
        </footer>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'close'
  },
  props: ['show', 'title', 'hascancel'],
  methods: {
    close() {
      this.$emit('close', false);
    },
    ok() {
      this.close();
      this.$emit('ok');
    },
    cancel() {
      this.close();
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-body {
  max-width: 600px;
  width: 50%;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>

