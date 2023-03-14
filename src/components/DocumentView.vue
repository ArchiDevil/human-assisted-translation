<script lang="ts">
import { useStore } from '../stores/store'
import DocumentRow from './DocumentRow.vue'
import IssuesPanel from './IssuesPanel.vue'

export default {
  components: { DocumentRow, IssuesPanel },
  computed: {
    segments() {
      const store = useStore()
      return store.segments
    }
  },
  methods: {
    download() {
      const store = useStore()
      const segments = []
      for (let segment of store.segments) {
        if (segment.original.trim() === '' && segment.translation.trim() === '') continue
        segments.push({
          original: segment.original.trim(),
          translation: segment.translation.trim()
        })
      }

      const blob = new Blob([JSON.stringify(segments, null, 2)], { type: 'text/json' })
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = store.filename
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    }
  }
}
</script>

<template>
  <DocumentRow class="drow" v-for="segment in segments" :key="segment.id" :segment="segment" />
  <button @click="download">Download the result</button>
  <IssuesPanel />
</template>

<style scoped>
button {
  @apply border-2 border-gray-800 p-8 rounded-md font-bold text-lg w-max;
}

button:hover {
  @apply bg-gray-800 text-white;
}

.drow:nth-child(even) {
  @apply bg-gray-50;
}

.drow:nth-child(odd) {
  @apply bg-gray-100;
}
</style>
