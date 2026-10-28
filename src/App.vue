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

<style scoped lang="scss">
.hero {
  background-image: url('./assets/img/banner.jpg');
  background-size: cover;
  background-position: center;
  height: 200px;
}

.mask {
  background-color: rgba(var(--brand-dark-rgb), 0.6);
}

footer {
  background-color: var(--brand-primary-dark);
  color: #fff;
}
</style>