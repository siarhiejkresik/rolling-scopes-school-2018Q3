<template>
  <section class="main">
    <section class="top">
      <h1 class="display-1">Гульня ў словы</h1>
      <div class="subtitle">Праверым, ці добра ты ведаеш беларускія словы?</div>
      <div class="menu m-5 w-50">
        <b-button
          size="lg"
          class="pulse" 
          @click="$emit('startGame')">Пачаць</b-button>
        <b-button
          size="lg"
          @click="$emit('showScores')">Дасягненні</b-button>
        </div>
    </section>
  </section>
</template>

<style scoped>
.top {
  display: grid;
  justify-items: center;
}
.menu {
  display: grid;
  grid-row-gap: 1em;
}
.subtitle {
  font-size: 24px;
}
</style>
