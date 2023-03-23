import { defineStore } from 'pinia'
import { Segment } from '../interfaces'

function findSegment(segments: Segment[], id: number): Segment {
  const segment = segments.find(s => s.id === id)
  if (!segment) {
    throw new Error('Segment not found')
  }
  return segment
}

function recalculateIds(segments: Segment[]): Segment[] {
  let id = 1
  for (const segment of segments) {
    segment.id = id++
  }
  return segments
}

function assembleNewSegments(
  segments: Segment[],
  segmentId: number,
  originals: string[],
  translations: string[]
): Segment[] {
  const newSegments = segments.slice(0, segmentId - 1)
  for (let i = 0; i < Math.max(originals.length, translations.length); i++) {
    newSegments.push({
      id: 0,
      original: i < originals.length ? originals[i] : '',
      translation: i < translations.length ? translations[i] : ''
    })
  }
  newSegments.push(...segments.slice(segmentId))
  return recalculateIds(newSegments)
}

function splitSentences(text: string): string[] {
  const delimiters = ['.', '!', '?', '...', '?!']
  const sentences: string[] = []
  let start = 0
  for (let i = 0; i < text.length; i++) {
    if (delimiters.includes(text.slice(i, i + 2))) {
      sentences.push(text.slice(start, i + 2).trim())
      start = i + 2
    } else if (delimiters.includes(text[i])) {
      sentences.push(text.slice(start, i + 1).trim())
      start = i + 1
    }
  }
  if (start < text.length) {
    sentences.push(text.slice(start).trim() + '.')
  }
  return sentences
}

export const useStore = defineStore('store', {
  state: () => ({
    segments: [] as Segment[],
    filename: ''
  }),
  actions: {
    deleteSegment(segmentId: number) {
      const newSegments = this.segments.filter(s => s.id !== segmentId)
      this.segments = recalculateIds(newSegments)
    },
    splitSegmentByNewline(segmentId: number) {
      const targetSegment = findSegment(this.segments, segmentId)
      const originals = targetSegment.original.split(/\\n/g)
      const translations = targetSegment.translation.split(/\\n/g)
      const newSegments = assembleNewSegments(this.segments, segmentId, originals, translations)

      // update the store
      this.segments = newSegments
    },
    splitSegmentBySentence(segmentId: number) {
      const targetSegment = findSegment(this.segments, segmentId)
      const originals = splitSentences(targetSegment.original)
      const translations = splitSentences(targetSegment.translation)
      const newSegments = assembleNewSegments(this.segments, segmentId, originals, translations)

      // update the store
      this.segments = newSegments
    },
    removeNewlines(segmentId: number) {
      const targetSegment = findSegment(this.segments, segmentId)

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
