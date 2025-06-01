<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 700" :model-value="isDialogVisible" @update:model-value="close()" width="600">
    <DialogCloseBtn @click="close()" />

    <VCard class="pa-sm-10 pa-2">
      <h4 class="text-h4 text-center mb-2">
        {{ $t('title.createFolder') }}
      </h4>

      <VForm ref="refForm" class="mt-4" @submit.prevent="onSubmit">
        <VRow>
          <VCol cols="12">
            <AppTextField v-model="folder.name" :label="$t('label.name')" :rules="[requiredValidator]"
              :placeholder="$t('placeholder.name')" />
          </VCol>
        </VRow>

        <VCol cols="12" class="mt-5 d-flex flex-wrap justify-center gap-4">
          <VBtn type="submit" :loading="isLoading">
            {{ $t('button.save') }}
          </VBtn>

          <VBtn color="error" variant="tonal" @click="close()">
            {{ $t('button.cancel') }}
          </VBtn>
        </VCol>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script>
import Folder from '@/models/Folder'
import { useStore } from '@/store/store'

export default {
  data() {
    return {
      folder: new Folder()
    }
  },

  props: {
    isDialogVisible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    isLoading() {
      return useStore().loading
    }
  },

  emits: ['close', 'create'],

  methods: {
    close() {
      this.$emit('close')
    },

    async onSubmit() {
      await this.$refs.refForm.validate().then(async ({ valid }) => {
        if (!valid) return
        await this.$emit('create', this.folder)
      })

      this.folder = new Folder()
      this.$refs.refForm.reset()
    },
  },
}
</script>
