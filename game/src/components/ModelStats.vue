<template>
    <div>
      <div class="name">ІМЯ: {{ name }}</div>
      <div class="health">ЖЫЦЦЁ: {{ health }}</div>
    </div>
</template>

<script>

export default {
  props: ['name', 'health']
};
</script>

<style scoped>
div {
  color: white;
  font-size: 20px;
}
</style>


