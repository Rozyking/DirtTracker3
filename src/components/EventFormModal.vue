<script>
import BaseModal from './BaseModal.vue'
import CountrySelect from './CountrySelect.vue'
import StageSelect from './StageSelect.vue'
import CarSelect from './CarSelect.vue'
import { rankOptions, eventTypes } from '@/data/options'

export default {
  components: { BaseModal, CountrySelect, StageSelect, CarSelect },
  props: {
    show: { type: Boolean, default: false },
    event: { type: Object, default: null },
    countries: { type: Array, required: true },
    stageData: { type: Object, required: true },
    carGroups: { type: Array, required: true }
  },
  emits: ["save", "close"],
  data() {
    return {
      form: this.blankForm(),
      errors: {},
      rankOptions,
      eventTypes
    };
  },
  computed: {
    title() {
      return this.event ? "Edit Event" : "Enter Event";
    },
    stages() {
      return this.stageData[this.form.country] || [];
    }
  },
  watch: {
    show(isOpen) {
      if (isOpen) {
        this.resetForm();
      }
    }
  },
  methods: {
    blankForm() { /* unchanged */ },
    resetForm() { /* unchanged */ },
    validate() { /* unchanged */ },
    save() { /* unchanged */ }
  }
}
</script>

<template>
    <base-modal :show="show" :title="title" @close="$emit('close')">
      <form @submit.prevent="save" novalidate>
        <div class="row mb-3">
          <div class="col-6">
            <country-select id="eventCountrySelect" v-model="form.country"
              @update:model-value="form.stage = null" :countries="countries"
              :error="errors.country" placeholder="Choose a country">
            </country-select>
          </div>
          <div class="col-6">
            <stage-select id="eventStageSelect" v-model="form.stage" :stages="stages"
              :disabled="!form.country" :error="errors.stage" label="Next Stage">
            </stage-select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="form-floating col-7">
            <input type="date" class="form-control" id="floatingEventDateInput"
              :class="{ 'is-invalid': errors.date }" v-model="form.date">
            <label for="floatingEventDateInput" class="ms-2">Date started</label>
            <div class="invalid-feedback">{{ errors.date }}</div>
          </div>
          <div class="col-5">
            <div class="form-floating">
              <select class="form-select form-select-sm h-100 fs-6" id="rankSelect"
                :class="{ 'is-invalid': errors.rank }" v-model="form.rank">
                <option :value="null" disabled>Choose rank</option>
                <option v-for="rank in rankOptions" :key="rank.value" :value="rank.value">{{ rank.label }}</option>
              </select>
              <label for="rankSelect">Rank</label>
              <div class="invalid-feedback">{{ errors.rank }}</div>
            </div>
          </div>
        </div>

        <car-select id="carSelect" v-model="form.car" :car-groups="carGroups"
          :error="errors.car" class="mb-3">
        </car-select>

        <div class="row mb-3">
          <div class="col-8">
            <div class="form-floating">
              <select class="form-select form-select-lg h-100 fs-6" id="eventSelect"
                :class="{ 'is-invalid': errors.type }" v-model="form.type">
                <option :value="null" disabled>Choose event</option>
                <option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <label for="eventSelect">Event type</label>
              <div class="invalid-feedback">{{ errors.type }}</div>
            </div>
          </div>
          <div class="form-floating col-4">
            <input type="number" class="form-control" id="floatingRaceNumber" min="1"
              :class="{ 'is-invalid': errors.stageCount }" v-model.number="form.stageCount">
            <label for="floatingRaceNumber" class="ms-2"># of stages</label>
            <div class="invalid-feedback">{{ errors.stageCount }}</div>
          </div>
        </div>
      </form>

      <template #footer>
        <button type="button" class="btn btn-custom" @click="save">Save Event</button>
      </template>
    </base-modal>
</template>