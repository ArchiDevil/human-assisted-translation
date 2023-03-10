<script lang="ts">
import { PropType } from 'vue'
import DocumentSegment from './DocumentSegment.vue'
import ActionButtons from './ActionButtons.vue'
import { Segment } from '../interfaces'
import { useStore } from '../stores/store'

export default {
  props: {
    segment: {
      type: Object as PropType<Segment>,
      required: true
    }
  },
  components: { DocumentSegment, ActionButtons },
  methods: {
    originalUpdate(value: string) {
      const store = useStore()
      const idx = store.segments.findIndex(s => s.id === this.segment.id)
      store.segments[idx].original = value
    },
    translationUpdate(value: string) {
      const store = useStore()
      const idx = store.segments.findIndex(s => s.id === this.segment.id)
      store.segments[idx].translation = value
    }
  },
  computed: {
    classObject() {
      return {
        balance: this.areUnbalanced
      }
    },
    areUnbalanced() {
      return this.segment.original.split('.').length !== this.segment.translation.split('.').length
    }
  }
}
</script>

<template>
  <div :class="classObject" class="flex flex-row">
    <p class="mx-3 py-3">{{ segment.id }}</p>
    <DocumentSegment class="w-1/2 mx-2" :text="segment.original" @input="originalUpdate" />
    <DocumentSegment class="w-1/2 mx-2" :text="segment.translation" @input="translationUpdate" />
    <ActionButtons class="w-1/12" :segment="segment" />
  </div>
</template>

<style scoped>
.balance {
  @apply border-l-4 border-teal-600;
}
</style>
