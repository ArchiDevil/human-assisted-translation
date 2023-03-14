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
    <p>Segments with newlines: {{ newlines }}</p>
    <p>Unbalanced segments: {{ unbalanced }}</p>
    <p>Empty segments: {{ empty }}</p>
  </div>
</template>
