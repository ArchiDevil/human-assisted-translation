import { defineStore } from 'pinia'
import { Segment } from '../interfaces'

export const useStore = defineStore('store', {
  state: () => ({
    segments: [] as Segment[],
    filename: '',
  })
})
