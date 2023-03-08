<script lang="ts">
import { registerRuntimeHelpers } from '@vue/compiler-core'
import { PropType } from 'vue'
import { Segment } from '../interfaces'
import { useStore } from '../stores/store'

export default {
  props: {
    segment: {
      type: Object as PropType<Segment>,
      required: true
    }
  },
  methods: {
    remove() {
      this.segment.original = this.segment.original.replace(/(\\n)/g, ' ')
      this.segment.translation = this.segment.translation.replace(/(\\n)/g, ' ')
    },
    split() {
      const store = useStore()
      const segments = store.segments.slice()
      const index = segments.indexOf(this.segment)

      // split the current segment into multiple by \n or \r\n
      const original = this.segment.original.split(/\\n/g)
      const translation = this.segment.translation.split(/\\n/g)

      console.log(this.segment.translation)
      console.log(translation)

      // assemble the new segments array
      const newSegments = segments.slice(0, index)
      for (let i = 0; i < Math.max(original.length, translation.length); i++) {
        newSegments.push({
          id: 0,
          original: i < original.length ? original[i] : '',
          translation: i < translation.length ? translation[i] : ''
        })
      }
      newSegments.push(...segments.slice(index + 1))

      // recalculate the ids from the beginning
      let id = 1
      for (const segment of newSegments) {
        segment.id = id++
      }

      // update the store
      store.segments = newSegments
    }
  }
}
</script>

<template>
  <div class="flex flex-col my-3">
    <button @click="remove">Remove</button>
    <button @click="split">Split</button>
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
