<template>
  <div>
    <div v-if="!isError">
      <label
        for="playerNameInput"
        class="display-4 d-block text-center animated fadeInDown faster"
      >
        Увядзіце сваё імя
      </label>
      <b-form
        class="login-form"
        @submit.prevent="onSubmit"
      >
        <b-form-group
          class="display-4"
        >
          <b-form-input
            id="playerNameInput"
            v-model="playerName"
            :disabled="isRequesting"
            type="text"
            size="lg"
            placeholder
            required
          />
          <b-button
            :disabled="isRequesting"
            type="submit"
            size="lg"
            :variant="isRequesting ? 'secondary' : 'primary'"
            class="d-block mx-auto mt-4 animated fadeInUp fast"
          >
            Гуляць
          </b-button>
        </b-form-group>
      </b-form>
    </div>
    <div
      v-else
      class="display-4 text-danger animated fadeInDown fast"
    >
      Праблемы з серверам
    </div>
  </div>
</template>

<script>
const ERROR_SHOW_TIME = 3000;

export default {
  data() {
    return {
      playerName: null,
      isError: false,
      isRequesting: false,
    };
  },
  methods: {
    async onSubmit() {
      this.isRequesting = true;
      try {
        await this.$store.dispatch('storage/getPlayer', this.playerName);
        this.$emit('logIn', true);
      } catch (err) {
        this.isError = true;
        setTimeout(() => {
          this.$emit('logIn', false);
        }, ERROR_SHOW_TIME);
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  min-width: 500px;
}
</style>
