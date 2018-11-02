<template>
  <section>
    <div class="d-flex flex-column align-items-center">
      <h2 class="display-4">Дасягненні</h2>
      <h4
        class="mt-4 text-weight-bold"
        v-if="lastRecord !== undefined">Вы занялі <strong>{{ lastRecord + 1 }}</strong> месца!
      </h4>
      <b-table
          class="records mt-5 mb-5 text-center"
          striped small
          :items="items"
          :fields="fields">
        <template slot="index" slot-scope="data">
          {{data.index + 1}}
        </template>
      </b-table>
      <b-button
        class="shadow-lg"
        @click="exit">Выйсці</b-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: 'index', label: 'Месца' },
        { key: 'playerName', label: 'Імя гульца' },
        { key: 'numOfMobs', label: 'Перамог' }
      ]
    };
  },
  computed: {
    items() {
      return this.$store.state.records.table;
    },
    lastRecord() {
      return this.$store.state.records.lastRecord;
    }
  },
  methods: {
    exit() {
      this.$store.commit('records/forgetLastRecord')
      this.$emit('exitGame');
    }
  }
};
</script>

<style scoped>
.records {
  min-width: 400px;
}
</style>

