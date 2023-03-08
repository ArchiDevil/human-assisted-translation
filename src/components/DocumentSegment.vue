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
    const elem = this.$refs.input as HTMLElement
    elem.style.height = '0'
    elem.style.height = this.$el.scrollHeight + 'px'
  },
  methods: {
    input() {
      const elem = this.$refs.input as HTMLElement
      elem.style.height = '0'
      elem.style.height = this.$el.scrollHeight + 'px'
      this.$emit('input', this.$el.value)
    }
  }
}
</script>

<template>
  <textarea :value="text" @input="input" spellcheck="false" ref="input" />
</template>

<style scoped>
textarea {
  @apply my-2 p-1 outline-none overflow-hidden resize-none bg-transparent;
}

textarea:focus {
  @apply border-b-2 border-sky-600 bg-white;
}
</style>
