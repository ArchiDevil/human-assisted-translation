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
    hasIssues(): boolean {
      return /\\n/g.test(this.text)
    }
  }
}
</script>

<template>
  <textarea :class="{'warning': hasIssues}" :value="text" @input="input" spellcheck="false" ref="input" />
</template>

<style scoped>
textarea {
  @apply my-2 p-1 outline-none overflow-hidden resize-none bg-transparent;
}

textarea:focus {
  @apply border-b-2 border-sky-600 bg-white;
}

.warning {
  @apply bg-amber-200;
}
</style>
