<script lang="ts">
import { useStore } from '../stores/store'

export default {
  computed: {
    newlines() {
      const store = useStore()
      return store.newlineSegmentsCount
    },
    unbalanced() {
      const store = useStore()
      return store.unbalancedSegmentsCount
    },
    empty() {
      const store = useStore()
      return store.emptySegmentsCount
    }
  }
}
</script>

<template>
  <div>
    <p class="decoration-amber-400">Segments with newlines: {{ newlines }}</p>
    <p class="decoration-red-400">Empty segments: {{ empty }}</p>
    <p class="decoration-teal-600">Unbalanced segments: {{ unbalanced }}</p>
  </div>
</template>

<style scoped>
p {
  @apply decoration-2 decoration-solid underline underline-offset-2;
}
</style>
