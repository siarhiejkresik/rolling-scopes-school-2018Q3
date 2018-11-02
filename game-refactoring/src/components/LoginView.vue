<template>
  <b-form
      @submit="onSubmit"
      class="login-form">
    <b-form-group
        class="display-4"
        label="Увядзіце сваё імя"
        label-for="playerNameInput">
      <b-form-input
          id="playerNameInput"
          v-model="playerName"
          type="text"
          size="lg"
          placeholder=""
          required>
      </b-form-input>
      <b-button
        type="submit"
        size="lg"
        variant="primary"
        class="d-block mx-auto mt-4">Гуляць</b-button>
    </b-form-group>
  </b-form>
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
      this.$emit('logIn', this.playerName);
    }
  }
};
</script>

<style scoped>
.login-form {
  min-width: 500px;
}
</style>
