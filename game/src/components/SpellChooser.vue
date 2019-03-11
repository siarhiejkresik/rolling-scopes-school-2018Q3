<template>
  <div>
    <b-radio-group
      id="spells"
      v-model="selected"
      buttons
      stacked
      button-variant="outline-secondary"
      size="lg"
      :options="options"
      name="radioBtnStacked"
      class="btn-block"
    />
  </div>
</template>

<script>
export default {
  props: ['spells'],
  data() {
    return {
      selected: undefined,
      centered: false,
    };
  },
  computed: {
    options() {
      return this.spells.map(spell => ({ value: spell.name, text: `${spell.name}` }));
    },
  },
  watch: {
    selected(value) {
      this.$parent.$emit('spellSet', value);
    },
  },
};
</script>
