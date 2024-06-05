<script>
import RangeFilter from './components/RangeFilter.vue'
export default {
  components: {RangeFilter},
  data: function () {
    return {
      flights: [],
      loading: true,
      error: false,
      range: { min: 50, max: 600 },
      thresholds: [0, 50, 100, 150, 200, 250, 300, 350,
        400, 450, 500, 550, 600, 650, 700, 750],
    }
  },
  mounted: function () {
    this.fetchFlights();
  },
  watch: {
    'range.min': function () {
      this.fetchFlights();
    },
    'range.max': function () {
      this.fetchFlights();
    },
  },
  methods: {
    fetchFlights: function () {
      this.loading = true;

      fetch(`http://localhost:3001/flights/${this.range.min}/${this.range.max}`)
        .then(res => res.json())
        .then(json => {
          this.loading = false;
          if (Array.isArray(json)) {
            this.flights = json
            this.error = false;
          } else {
            this.error = true;
          }
        })
        .catch(error => console.log('Error' + error));
    }
  },
}
</script>

<template>
  <RangeFilter v-model="range" :thresholds="thresholds" />
  (your price range is from {{ range.min }} to {{ range.max }})
  <button @click="this.range.min = 50; this.range.max = 600;">Reset</button>
  <ul>
    <span v-if="loading">Loading...</span>
    <span v-else-if="error">Uops! Something went wrong!</span>
    <li v-else v-for="flight in flights">
      <span>{{ flight.from }} - {{ flight.to }} - {{ flight.price }}</span>
    </li>
  </ul>
</template>

<style scoped></style>
