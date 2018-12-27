/* A simple component to show a message and a spinner while your application loads.

You can show a loading message by setting 'message' property.
*/

<template>
  <div class="container flex-centered">
    <div class="content flex-centered flex-column">
      <div
        v-if="message"
        class="display-4">{{ message }}</div>
      <div class="spinner m-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message']
};
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
