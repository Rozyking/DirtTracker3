<script>
import CountrySelect from '@/components/CountrySelect.vue'
import EventList from '@/components/EventList.vue'
import EventFormModal from '@/components/EventFormModal.vue'
import BaseModal from '@/components/BaseModal.vue'
import ResultForm from '@/components/ResultForm.vue'
import StageTimesTable from '@/components/StageTimesTable.vue'
import StageChart from '@/components/StageChart.vue'
import stageData from '@/data/stages.json'
import cars from '@/data/cars.json'
import { getSeedData } from '@/data/seed'
import { groupCars } from '@/helpers/groupCars'

export default {
  components: {
    CountrySelect, EventList, EventFormModal, BaseModal,
    ResultForm, StageTimesTable, StageChart
  },
  data() {
    const seed = getSeedData()
    return {
      stageData,
      carGroups: groupCars(cars),
      events: seed.events,
      results: seed.results,
      selectedCountry: null,
      selectedStage: null,
      // modal state: whole objects are stored, never ids or array indexes
      showEventModal: false,
      eventBeingEdited: null,
      showResultModal: false,
      resultEvent: null
    }
  },
  computed: {
    countries() {
      return Object.keys(this.stageData)
    },
    // results for the selected country (empty until a country is chosen)
    stageResults() {
      return this.results.filter(r => r.country === this.selectedCountry)
    },
    // the car is locked when the result is being added from an event
    lockResultContext() {
      return this.resultEvent !== null
    },
    resultDefaults() {
      if (this.resultEvent) {
        return {
          country: this.resultEvent.country,
          stage: this.resultEvent.nextStage,
          car: this.resultEvent.car
        }
      }
      return { country: this.selectedCountry, stage: this.selectedStage }
    }
  },
  watch: {
    // a stage from one country makes no sense in another
    selectedCountry() {
      this.selectedStage = null
    }
  },
  methods: {
    nextId(list) {
      return list.reduce((max, item) => Math.max(max, item.id), 0) + 1
    },

    // ---- events ----
    startAddEvent() {
      this.eventBeingEdited = null
      this.showEventModal = true
    },
    editEvent(event) {
      this.eventBeingEdited = event
      this.showEventModal = true
    },
    saveEvent(form) {
      const fields = {
        name: form.type,
        rank: form.rank,
        car: form.car,
        country: form.country,
        nextStage: form.stage,
        date: form.date,
        stageCount: form.stageCount
      }
      if (this.eventBeingEdited) {
        Object.assign(this.eventBeingEdited, fields)
      } else {
        this.events.push({
          id: this.nextId(this.events),
          place: 'No place yet',
          progress: 0,
          results: [],
          ...fields
        })
      }
      this.showEventModal = false
      this.eventBeingEdited = null
    },
    deleteEvent(event) {
      if (!confirm('Delete "' + event.name + '"?')) return
      this.events = this.events.filter(e => e !== event)
    },

    // ---- results ----
    startAddResult() {
      this.resultEvent = null
      this.showResultModal = true
    },
    prefillResultForEvent(event) {
      this.resultEvent = event
      this.showResultModal = true
    },
    closeResultModal() {
      this.showResultModal = false
      this.resultEvent = null
    },
    addResult(data) {
      const result = { id: this.nextId(this.results), ...data }
      this.results.push(result)
      if (this.resultEvent) {
        this.resultEvent.results.push(result)
        const done = this.resultEvent.results.length
        this.resultEvent.progress = Math.min(100, Math.round(done / this.resultEvent.stageCount * 100))
      }
      // jump to the new result so it shows in the table and chart
      this.selectedCountry = result.country
      this.$nextTick(() => { this.selectedStage = result.stage })
      this.closeResultModal()
    },
    deleteResult(result) {
      this.results = this.results.filter(r => r !== result)
      this.events.forEach(e => {
        e.results = e.results.filter(r => r !== result)
      })
      if (!this.stageResults.some(r => r.stage === this.selectedStage)) {
        this.selectedStage = null
      }
    }
  }
}
</script>

<template>
  <div>
    <header>
      <!-- Hero -->
      <div class="hero text-center bg-image">
        <div class="mask h-100" style="background-color: rgba(0, 0, 0, 0.6);">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1>Dirt Rally 2.0 Tracker</h1>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Results modal uses BaseModal component -->
    <base-modal :show="showResultModal" title="Enter Result" @close="closeResultModal">
      <result-form :initial-values="resultDefaults" :countries="countries" :stage-data="stageData"
        :car-groups="carGroups" :lock-context="lockResultContext" @save="addResult" @cancel="closeResultModal">
      </result-form>
    </base-modal>

    <!-- Events Modal uses BaseModal component -->
    <event-form-modal :show="showEventModal" :event="eventBeingEdited" :countries="countries" :stage-data="stageData"
      :car-groups="carGroups" @save="saveEvent" @close="showEventModal = false">
    </event-form-modal>

    <main class="bg-light pb-5">
      <!-- Main container for all page content -->
      <div class="container pb-5">
        <div class="text-center pt-3 mb-3">
          <h2>Events</h2>
        </div>
        <!-- First row: Current events & add event button -->
        <div class="row align-items-center my-3">
          <!-- Current Events table component - Format buttons for adding events to the right on desktop, underneath on mobile -->
          <event-list class="col-lg-8 mb-3" :events="events" @edit="editEvent" @delete="deleteEvent"
            @add-result="prefillResultForEvent">
          </event-list>

          <div class="col-lg-4 align-self-start">
            <button type="button" class="btn btn-custom w-100 py-5 fs-4" @click="startAddEvent">
              Add Event</button>
          </div>
        </div>
        <!-- Second row: Stages and Statistics -->
        <div class="row pb-4">
          <div class="col-lg-6 mt-4">
            <h2 class="text-center mt-3 mb-2">Stage Times</h2>
            <!-- CountrySelect component -->
            <country-select id="countrySelect" v-model="selectedCountry" :countries="countries" label="Country"
              placeholder="Choose a country to view times" allow-clear class="mb-3">
            </country-select>

            <!-- Stage times table component -->
            <stage-times-table :results="stageResults" :selected-country="selectedCountry"
              :selected-stage="selectedStage" @select-stage="selectedStage = $event" @delete-result="deleteResult">
            </stage-times-table>

            <!-- Opens the same Enter Result modal, with the selected country prefilled -->
            <button type="button" class="btn btn-custom w-100 py-3" @click="startAddResult">
              Add Result
            </button>
          </div>
          <div class="col-lg-6 mt-4">
            <h2 class="text-center mt-3 mb-2">Stage Chart</h2>
            <!-- Chart.js component -->
            <stage-chart :results="stageResults" :selected-stage="selectedStage"></stage-chart>
          </div>
        </div>
      </div>
    </main>
    <footer class="text-center">
      <p class="p-5 m-0">&copy; Zane Robe - 2026 - Dirt Rally 2.0 Tracker</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.hero {
  background-image: url('./assets/img/banner.jpg');
  background-size: cover;
  background-position: center;
  height: 200px;
}

footer {
  background-color: var(--brand-primary-dark);
  color: #fff;
}
</style>