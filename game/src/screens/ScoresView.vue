<template>
  <section>
    <div class="d-flex flex-column align-items-center">
      <h2 class="display-4 animated fadeInDown faster">
        Дасягненні
      </h2>
      <h4
        v-if="placeInTop !== null"
        class="mt-3 text-weight-bold animated bounceIn delay-1s"
      >
        Вы занялі
        <strong class="inline-block animated pulse delay-1s">
          {{ placeInTop + 1 }}
        </strong> месца!
      </h4>
      <b-table
        class="records mt-5 mb-5 text-center animated fadeIn faster"
        striped
        small
        :items="records"
        :fields="fields"
      >
        <template
          slot="index"
          slot-scope="data"
        >
          {{ data.index + 1 }}
        </template>
      </b-table>
      <b-button
        class="w-50 animated fadeInUp"
        size="lg"
        @click="exit"
      >
        Выйсці
      </b-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: 'index', label: 'Месца' },
        { key: 'name', label: 'Імя гульца' },
        { key: 'score', label: 'Перамог' },
      ],
      records: [],
    };
  },
  computed: {
    placeInTop() {
      const playerName = this.$store.state.player.name;
      const { lastScore } = this.$store.state.player;
      let place = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const { name, score } of this.records) {
        if (name === playerName && score === lastScore) {
          return place;
        }
        place += 1;
      }
      return null;
    },
  },
  async mounted() {
    try {
      this.records = await this.$store.dispatch('storage/getScores');
    } catch (err) {
      this.records = [];
    }
  },
  methods: {
    exit() {
      this.$emit('exitGame');
    },
  },
};
</script>

<style scoped>
.records {
  min-width: 400px;
}
</style>
