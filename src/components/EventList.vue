<script>
import EventItem from './EventItem.vue'

export default {
  components: { EventItem },
  props: {
    events: { type: Array, required: true }
  },
  emits: ["edit", "delete", "add-result"],
  data() {
    return {
      openEvent: null
    };
  },
  methods: {
    toggle(event) {
      // clicking the open item closes it, clicking another opens that one and closes the rest
      this.openEvent = this.openEvent === event ? null : event;
    }
  }
}
</script>

<template>
  <div class="accordion">
    <event-item v-for="event in events" :key="event.id"
      :event="event" :is-open="openEvent === event"
      @toggle="toggle(event)"
      @edit="$emit('edit', event)"
      @delete="$emit('delete', event)"
      @add-result="$emit('add-result', event)">
    </event-item>
    <p v-if="events.length === 0" class="text-center text-muted p-4 mb-0">
      No events yet. Add one to get started.
    </p>
  </div>
</template>