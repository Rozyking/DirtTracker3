<script>
import CountrySelect from '@/components/CountrySelect.vue'
import stageData from '@/data/stages.json'

export default {
  components: { CountrySelect },
  data() {
    return { stageData, country: null }
  },
  computed: {
    countries() { return Object.keys(this.stageData) }
  }
}
</script>

<template>
  <div class="container py-4">
    <country-select id="test" v-model="country" :countries="countries"></country-select>
    <p class="mt-3">Selected: {{ country }}</p>
  </div>
</template>