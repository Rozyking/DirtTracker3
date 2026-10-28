# Dirt Rally Tracker 3.0

A Vue 3 app for logging Dirt Rally events and stage times. This version is a conversion of the Vue 2.5 app into **Single File Components** using Vite.

## Features

- Add, edit, and delete rally events (accordion list with progress bars)
- Add stage results from an event (car locked, stage pre-filled) or from the Stage Times section
- Filter stage times by country and select a stage to see it on a Chart.js line chart
- Form validation on the event and result forms

## Tech

- Vue 3 (Options API) + Vite
- Bootstrap 5 via SCSS (custom brand theme in `src/assets/scss/app.scss`)
- Bootstrap Icons
- Chart.js

## Project Structure

```
src/
  App.vue                 App shell; owns events, results, and selection state
  main.js                 App entry point
  components/
    BaseModal.vue         Reusable modal with default and footer slots
    CarSelect.vue         Grouped car dropdown (v-model)
    CountrySelect.vue     Country dropdown (v-model)
    StageSelect.vue       Stage dropdown (v-model)
    EventFormModal.vue    Add/edit event form in a modal
    ResultForm.vue        Add result form with validation
    EventList.vue         Accordion of events
    EventItem.vue         A single event in the accordion
    StageTimesTable.vue   Results table for the selected country
    StageChart.vue        Chart.js line chart for the selected stage
  data/                   Stage and car JSON, dropdown options, seed data
  helpers/                time.js (time conversion), groupCars.js
  assets/                 Banner image and app-level SCSS
```

Component styles live in scoped `<style>` blocks. Only app-wide styles (Bootstrap theme, brand colors, fonts) stay in `app.scss`.

## Setup

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
```