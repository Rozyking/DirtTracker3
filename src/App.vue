<template>
  <header class="hero text-center d-flex align-items-center justify-content-center">
    <h1 class="text-white">Dirt Rally 2.0 Tracker</h1>
  </header>
  <div class="container py-4">
    <button class="btn btn-custom">Test <i class="bi bi-trash"></i></button>
  </div>
</template>

<script>
import cars from '@/data/cars.json'
import { getSeedData } from '@/data/seed'
import { groupCars } from '@/helpers/groupCars'
import { toSeconds, formatSeconds } from '@/helpers/time'

console.log(getSeedData())
console.log(groupCars(cars))
console.log(toSeconds("3:58.223"), formatSeconds(238.223))
export default {}
</script>