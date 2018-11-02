<template>
  <div class="display-4">ПАЧАКАЙЦЕ...</div>
</template>
<script>
export default {
  computed: {
    isLoaded() {
      return this.$store.state.assets.isLoaded;
    }
  },
  watch: {
    isLoaded: function() {
      if (this.isLoaded) {
        this.$emit('loaded');
      }
    }
  }
};
</script>
