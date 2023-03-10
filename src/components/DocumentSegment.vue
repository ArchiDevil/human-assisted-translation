<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  emits: ['input'],
  mounted() {
    this.updateHeight()
  },
  updated() {
    this.updateHeight()
  },
  methods: {
    updateHeight() {
      const elem = this.$refs.input as HTMLElement
      elem.style.height = '0'
      elem.style.height = this.$el.scrollHeight + 'px'
    },
    input() {
      this.updateHeight()
      this.$emit('input', this.$el.value)
    }
  },
  computed: {
    classObject() {
      return {
        warning: this.hasNewlines,
        error: this.isEmpty
      }
    },
    hasNewlines() {
      return /\\n/g.test(this.text)
    },
    isEmpty() {
      return this.text === ''
    }
  }
}
</script>

<template>
  <textarea :class="classObject" :value="text" @input="input" spellcheck="false" ref="input" />
</template>

<style scoped>
textarea {
  @apply my-2 p-1 outline-none overflow-hidden resize-none bg-transparent;
}

textarea:focus {
  @apply border-b-2 border-sky-600 bg-white;
}

.warning {
  @apply border-l-4 border-amber-400;
}

.error {
  @apply border-l-4 border-red-400;
}
</style>
