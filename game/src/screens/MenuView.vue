<template>
  <section class="main">
    <section class="top">
      <h1 class="title display-1 mb-1 text-center animated fadeInDown">
        <span>Падарожжа</span>
        <span class="title-small display-4 animated fadeIn">
          <br>ў краіну слоў
        </span> 
      </h1>
      <div class="menu m-5 w-50">
        <b-button
          size="lg"
          class="pulse animated fadeInUp faster"
          @click="$emit('startGame')"
        >
          Пачаць
        </b-button>
        <b-button
          size="lg"
          class="pulse animated fadeInUp"
          @click="$emit('showScores')"
        >
          Дасягненні
        </b-button>
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

.title {
  line-height: 0.8;
}

.subtitle {
  font-size: 1.25rem;
}
</style>
