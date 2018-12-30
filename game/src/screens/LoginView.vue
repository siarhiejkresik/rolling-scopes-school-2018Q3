<template>
  <div>
    <label
      for="playerNameInput"
      class="display-4 d-block text-center animated fadeInDown faster"
    >
      Увядзіце сваё імя
    </label>
    <b-form
      class="login-form"
      @submit="onSubmit"
    >
      <b-form-group
        class="display-4"
      >
        <b-form-input
          id="playerNameInput"
          v-model="playerName"
          type="text"
          size="lg"
          placeholder
          required
        />
        <b-button
          type="submit"
          size="lg"
          variant="primary"
          class="d-block mx-auto mt-4 animated fadeInUp fast"
        >
          Гуляць
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: null
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.commit("player/setName", this.playerName);
      this.$emit("logIn");
    }
  }
};
</script>

<style scoped>
.login-form {
  min-width: 500px;
}
</style>
