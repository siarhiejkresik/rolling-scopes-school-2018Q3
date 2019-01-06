<template>
  <div
    ref="container"
    class="container"
  >
    <div
      class="dot"
      :style="{top: top+'px', left: left+'px'}"
    />
    <damage
      v-if="isShow"
      :damage="message"
      :vertical-axis="left"
      :horizontal-axis="top"
    />
    <div class="d-flex flex-column m-auto align-items-center">
      <b-button
        class="m-3"
        :disabled="isShow"
        @click="show"
      >
        Show
      </b-button>
    </div>
  </div>
</template>

<script>
const SHOW_TIME = 5000;

export default {
  data() {
    return {
      isShow: false,
      message: 69,
      width: 600,
      height: 600,
    };
  },
  computed: {
    top() {
      return this.height / 2;
    },
    left() {
      return this.width / 2;
    },
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, SHOW_TIME);
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh;
}

.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: red;
}
</style>
