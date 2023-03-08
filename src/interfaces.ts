export interface FileSegment {
  original: string
  translation: string
}

export interface Segment extends FileSegment {
  id: number
}
