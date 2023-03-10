<script lang="ts">
import { useStore } from '../stores/store'
import { Segment } from '../interfaces'

export default {
  data() {
    return {
      drag: false
    }
  },
  methods: {
    dragenter(event: DragEvent) {
      event.preventDefault()
      event.stopPropagation()
      this.drag = true
    },
    dragover(event: DragEvent) {
      event.preventDefault()
      event.stopPropagation()
    },
    dragend(event: DragEvent) {
      event.preventDefault()
      event.stopPropagation()
      this.drag = false
    },
    dragleave(event: DragEvent) {
      event.preventDefault()
      event.stopPropagation()
      this.drag = false
    },
    drop(event: DragEvent) {
      event.preventDefault()
      event.stopPropagation()

      if (!event.dataTransfer) {
        return
      }

      const files = event.dataTransfer.files
      const file = files[0]
      const component = this

      const reader = new FileReader()
      reader.onload = function (e) {
        if (!e.target) {
          return
        }

        // Process file data here
        const fileData = e.target.result as string
        const fileSegments: Segment[] = JSON.parse(fileData)
        let i = 1
        for (let segment of fileSegments) {
          segment.id = i++
          segment.original = segment.original
            .trim()
            .replace(/(\n|\r\n)/g, '\\n')
            .replace(/\t/g, '    ')
            .replace(/¬/g, '')
          segment.translation = segment.translation
            .trim()
            .replace(/(\n|\r\n)/g, '\\n')
            .replace(/\t/g, '    ')
            .replace(/¬/g, '')
        }
        const store = useStore()
        store.segments = fileSegments
        store.filename = file.name
        component.$router.push('/human-assisted-translation/document')
      }
      reader.readAsText(file)
    }
  }
}
</script>

<template>
  <div
    class="border-2 border-gray-800 p-8 rounded-md font-bold text-lg"
    :class="{ 'border-green-600 bg-green-200': drag }"
    @dragenter="dragenter"
    @dragleave="dragleave"
    @dragover="dragover"
    @dragend="dragend"
    @drop="drop"
  >
    Drop file here
  </div>
</template>
