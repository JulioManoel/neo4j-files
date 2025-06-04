<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 700" :model-value="isDialogVisible" @update:model-value="close()" width="600">
    <DialogCloseBtn @click="close()" />

    <VCard class="pa-sm-10 pa-2">
      <h4 class="text-h4 text-center mb-2">
        {{ !!selectedItem ? $t('title.editUser') : $t('title.createUser') }}
      </h4>

      <VForm ref="refForm" class="mt-4" @submit.prevent="onSubmit">
        <VRow>
          <VCol cols="12" md="6" lg="6" xl="6">
            <AppTextField v-model="user.name" :label="$t('label.name')" :rules="[requiredValidator]"
              :placeholder="$t('placeholder.name')" />
          </VCol>

          <VCol cols="12" md="6" lg="6" xl="6">
            <AppTextField v-model="user.email" :label="$t('label.email')" :rules="[requiredValidator]"
              :placeholder="$t('placeholder.email')" />
          </VCol>

          <VCol cols="12" md="6" lg="6" xl="6">
            <AppTextField v-model="user.password" type="password" :label="$t('label.password')" :rules="[requiredValidator]"
              :placeholder="$t('placeholder.password')" />
          </VCol>

          <VCol cols="12" md="6" lg="6" xl="6">
            <AppTextField v-model="user.confirm" type="password" :label="$t('label.confirm')" :rules="[requiredValidator]"
              :placeholder="$t('placeholder.confirm')" />
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
import User from '@/models/User'
import { useStore } from '@/store/store'

export default {
  data() {
    return {
      user: new User()
    }
  },

  props: {
    isDialogVisible: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    selectedItem: {
      type: Object,
      default: null
    }
  },

  computed: {
    isLoading() {
      return useStore().loading
    }
  },

  emits: ['close', 'create', 'update'],

  methods: {
    close() {
      this.$emit('close')
    },

    async onSubmit() {
      if (this.user.password !== this.user.confirm) {
        return
      }

      await this.$refs.refForm.validate().then(async ({ valid }) => {
        if (!valid) return
        if (!this.selectedItem) await this.$emit('create', this.user)
        else await this.$emit('update', this.user)
      })

      this.user = new User()
      this.$refs.refForm.reset()
    },
  },

  watch: {
    selectedItem() {
      this.user = this.selectedItem || new User()
    }
  }
}
</script>
