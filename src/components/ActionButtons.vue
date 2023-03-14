<script lang="ts">
import { useStore } from '../stores/store'

export default {
  props: {
    segmentId: {
      type: Number,
      required: true
    }
  },
  methods: {
    remove() {
      const store = useStore()
      store.removeNewlines(this.segmentId)
    },
    split() {
      const store = useStore()
      store.splitSegmentByNewline(this.segmentId)
    },
    deleteSegment() {
      const store = useStore()
      store.deleteSegment(this.segmentId)
    }
  }
}
</script>

<template>
  <div class="flex flex-col my-3">
    <button @click="remove">Remove \n</button>
    <button @click="split">Split by \n</button>
    <button @click="deleteSegment">Delete seg</button>
  </div>
</template>

<style scoped>
button {
  @apply border-2 rounded-md mx-2 my-1 p-1 transition bg-white;
}

button:hover {
  @apply bg-sky-600 text-white;
}
</style>
