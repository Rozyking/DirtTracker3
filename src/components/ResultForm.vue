<script>
import CountrySelect from './CountrySelect.vue'
import StageSelect from './StageSelect.vue'
import CarSelect from './CarSelect.vue'
import { conditionOptions } from '@/data/options'

export default {
  components: { CountrySelect, StageSelect, CarSelect },
  props: {
    initialValues: { type: Object, default: () => ({}) },
    countries: { type: Array, required: true },
    stageData: { type: Object, required: true },
    carGroups: { type: Array, required: true },
    lockContext: { type: Boolean, default: false },
  },
  emits: ["save", "cancel"],
  data() {
    const start = this.initialValues;
    return {
      form: {
        country: start.country ?? null,
        stage: start.stage ?? null,
        car: start.car ?? null,
        position: null,
        date: null,
        time: null,
        conditions: null,
        notes: "",
        pb: false
      },
      errors: {},
      conditionOptions
    };
  },
  computed: {
    stages() {
      return this.stageData[this.form.country] || [];
    }
  },
  methods: {
    fid(name) {
      return "result-" + name;
    },
    validate() {
      // ...your existing validate() body, unchanged
    },
    save() {
      // ...your existing save() body, unchanged
    }
  }
}
</script>

<template>
    <form @submit.prevent="save" novalidate>
      <country-select :id="fid('country')" v-model="form.country"
        @update:model-value="form.stage = null" :countries="countries"
        :error="errors.country" label="Country" placeholder="Choose a country" class="mb-3">
      </country-select>

      <stage-select :id="fid('stage')" v-model="form.stage" :stages="stages"
        :disabled="!form.country" :error="errors.stage" class="mb-3">
      </stage-select>

      <car-select :id="fid('car')" v-model="form.car" :car-groups="carGroups"
        :disabled="lockContext" :error="errors.car" class="mb-3">
      </car-select>

      <div class="row mb-3">
        <div class="form-floating col-4">
          <input type="number" class="form-control" :id="fid('position')" min="1"
            :class="{ 'is-invalid': errors.position }" v-model.number="form.position">
          <label :for="fid('position')" class="ms-2">Position</label>
          <div class="invalid-feedback">{{ errors.position }}</div>
        </div>
        <div class="form-floating col-8">
          <input type="date" class="form-control" :id="fid('date')"
            :class="{ 'is-invalid': errors.date }" v-model="form.date">
          <label :for="fid('date')" class="ms-2">Result Date</label>
          <div class="invalid-feedback">{{ errors.date }}</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-6">
          <div class="form-floating">
            <select class="form-select form-select-sm h-100 fs-6" :id="fid('conditions')"
              :class="{ 'is-invalid': errors.conditions }" v-model="form.conditions">
              <option :value="null" disabled>Choose conditions</option>
              <option v-for="c in conditionOptions" :key="c.value" :value="c.value">{{ c.label }}</option>
            </select>
            <label :for="fid('conditions')">Conditions</label>
            <div class="invalid-feedback">{{ errors.conditions }}</div>
          </div>
        </div>
        <div class="form-floating col-6">
          <input type="text" class="form-control" :id="fid('time')" placeholder="3:58.223"
            :class="{ 'is-invalid': errors.time }" v-model="form.time">
          <label :for="fid('time')" class="ms-2">Time (mm:ss.fff)</label>
          <div class="invalid-feedback">{{ errors.time }}</div>
        </div>
      </div>

      <div class="form-floating mb-3">
        <textarea class="form-control" placeholder="Race notes" :id="fid('notes')"
          v-model="form.notes"></textarea>
        <label :for="fid('notes')">Notes</label>
      </div>

      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" :id="fid('pb')" v-model="form.pb">
        <label class="form-check-label" :for="fid('pb')">Personal best</label>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
        <button type="button" class="btn btn-custom" @click="save">Save results</button>
      </div>
    </form>
</template>