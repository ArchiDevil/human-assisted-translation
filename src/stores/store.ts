import { defineStore } from 'pinia'
import { Segment } from '../interfaces'

export const useStore = defineStore('store', {
  state: () => ({
    segments: [] as Segment[],
    filename: ''
  }),
  actions: {
    deleteSegment(segmentId: number) {
      const newSegments = this.segments.filter(s => s.id !== segmentId)

      // recalculate the ids from the beginning
      let id = 1
      for (const segment of newSegments) {
        segment.id = id++
      }
      this.segments = newSegments
    },
    splitSegmentByNewline(segmentId: number) {
      const targetSegment = this.segments.find(s => s.id === segmentId)
      if (!targetSegment) {
        return
      }

      // split the current segment into multiple by \n
      const originals = targetSegment.original.split(/\\n/g)
      const translations = targetSegment.translation.split(/\\n/g)

      // assemble the new segments array
      const newSegments = this.segments.slice(0, segmentId - 1)
      for (let i = 0; i < Math.max(originals.length, translations.length); i++) {
        newSegments.push({
          id: 0,
          original: i < originals.length ? originals[i] : '',
          translation: i < translations.length ? translations[i] : ''
        })
      }
      newSegments.push(...this.segments.slice(segmentId))

      // recalculate the ids from the beginning
      let id = 1
      for (const segment of newSegments) {
        segment.id = id++
      }

      // update the store
      this.segments = newSegments
    },
    removeNewlines(segmentId: number) {
      const targetSegment = this.segments.find(s => s.id === segmentId)
      if (!targetSegment) {
        return
      }

      targetSegment.original = targetSegment.original.replace(/(\\n)/g, ' ')
      targetSegment.translation = targetSegment.translation.replace(/(\\n)/g, ' ')
    }
  },
  getters: {
    emptySegmentsCount(state) {
      return state.segments.filter(s => !s.original || !s.translation).length
    },
    newlineSegmentsCount(state) {
      return state.segments.filter(s => /\\n/g.test(s.original) || /\\n/g.test(s.translation))
        .length
    },
    unbalancedSegmentsCount(state) {
      return state.segments.filter(s => {
        const originalLines = s.original.split('.')
        const translationLines = s.translation.split('.')
        return originalLines.length !== translationLines.length
      }).length
    },
    hasErrors(): boolean {
      return (
        this.emptySegmentsCount > 0 ||
        this.newlineSegmentsCount > 0 ||
        this.unbalancedSegmentsCount > 0
      )
    }
  }
})
