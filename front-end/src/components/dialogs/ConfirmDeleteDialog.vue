<template>
  <VDialog :model-value="isDialogVisible"
  @update:model-value="close()" :width="$vuetify.display.smAndDown ? 'auto' : 700">
    <VCard>
      <VCardTitle class="text-h5 pt-6 px-6">
        {{ $t('text.confirmDelete') }}
      </VCardTitle>

      <VCardText class="px-6 py-4">
        {{ $t('text.confirmDocText') }}
      </VCardText>

      <VCardActions class="pb-6 px-6">
        <VSpacer />
        <VBtn color="secondary" variant="tonal" @click="close">
          {{ $t('button.cancel') }}
        </VBtn>
        <VBtn color="error" variant="elevated" @click="confirmDelete" :loading="isLoading">
          {{ $t('button.delete') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import { useStore } from '@/store/store'

export default {
  props: {
    isDialogVisible: {
      type: Boolean,
      required: true
    },
  },

  emits: ['close', 'confirm'],

  computed: {
    isLoading() {
      return useStore().loading
    }
  },

  methods: {
    close() {
      this.$emit('close', false)
    },

    confirmDelete() {
      this.$emit('confirm')
    }
  }
}
</script>
