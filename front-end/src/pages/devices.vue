<template>
  <div>
    <h1 class="mb-5">
      {{ $t('title.devices') }}
    </h1>

    <VCard>
      <VRow class="mb-2 mx-2 mt-2">
        <VCol cols="12" lg="10" md="10" sm="10">
          <VTextField :placeholder="$t('search.device')" v-model="search" single-line hide-details dense outlined />
        </VCol>
        
        <VCol cols="12" lg="2" md="2" sm="2">
          <VBtn color="success" block @click="getAll">
            {{ $t('button.search') }}
            <VIcon class="ml-2">tabler-search</VIcon>
          </VBtn>
        </VCol>
      </VRow>

      <VDataTable :items="devices" :headers="headers">
        <template #item.actions="{ item }">
          <VBtn color="transparent" flat @click="">
            <VIcon size="24">tabler-eye</VIcon>
            <VTooltip activator="parent" location="top">
              {{ $t("tooltip.edit") }}
            </VTooltip>
          </VBtn>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<script>
import { useDeviceStore } from '@/store/device'

export default {
  data() {
    return {
      headers: [
        { title: 'IP', key: 'ip' },
        { title: this.$t('headers.language'), key: 'language' },
        { title: this.$t('headers.platform'), key: 'platform' },
        { title: this.$t('headers.brower'), key: 'brower' },
        // { title: this.$t('headers.actions'), key: 'actions', align: 'center' },
      ],
      search: '',
    }
  },

  computed: {
    devices() {
      return useDeviceStore().devices ?? []
    },
  },

  methods: {
    async getAll() {
      await useDeviceStore().getAll(this.search)
    },
  },

  async created() {
    await this.getAll()
  }
}
</script>
