<template>
  <div>
    <h1 class="mb-5">
      {{ $t('title.users') }}
    </h1>

    <VCard>
      <VRow class="mb-2 mx-2 mt-2">
        <VCol cols="12" lg="8" md="8" sm="8">
          <VTextField :placeholder="$t('search.user')" v-model="search" single-line hide-details dense outlined />
        </VCol>
        
        <VCol cols="12" lg="2" md="2" sm="2">
          <VBtn color="success" block @click="getAll">
            {{ $t('button.search') }}
            <VIcon class="ml-2">tabler-search</VIcon>
          </VBtn>
        </VCol>
        
        <VCol cols="12" lg="2" md="2" sm="2">
          <VBtn color="primary" block @click="handleCreate()">
            {{ $t("button.add") }}
            <VIcon class="ml-2">tabler-plus</VIcon>
          </VBtn>
        </VCol>
      </VRow>

      <VDataTable :items="users" :headers="headers">
        <template #item.actions="{ item }">
          <VBtn color="transparent" flat @click="handleEdit(item)">
            <VIcon size="24">tabler-edit</VIcon>
            <VTooltip activator="parent" location="top">
              {{ $t("tooltip.edit") }}
            </VTooltip>
          </VBtn>

          <VBtn color="transparent" flat @click="handleDelete(item)">
            <VIcon size="24">tabler-trash</VIcon>
            <VTooltip activator="parent" location="top">
              {{ $t("tooltip.delete") }}
            </VTooltip>
          </VBtn>
        </template>
      </VDataTable>
    </VCard>

    <UserDialog :isDialogVisible="isDialogUserVisible" :selectedItem="selectedItem" @close="closeUserDialog" @create="create" @update="update" />
    <ConfirmDeleteDialog :isDialogVisible="isDialogDeleteVisible" @close="closeDeleteDialog" @confirm="deleteUser()" />
  </div>
</template>

<script>
import UserDialog from '@/components/dialogs/UserDialog.vue'
import ConfirmDeleteDialog from '@/components/dialogs/ConfirmDeleteDialog.vue'
import { useUserStore } from '@/store/user'

export default {
  components: {
    UserDialog,
    ConfirmDeleteDialog
  },

  data() {
    return {
      headers: [
        { title: 'ID', key: 'id' },
        { title: this.$t('headers.name'), key: 'name' },
        { title: this.$t('headers.email'), key: 'email' },
        { title: this.$t('headers.actions'), key: 'actions', align: 'center' },
      ],
      search: '',
      isDialogUserVisible: false,
      isDialogDeleteVisible: false,
      selectedItem: null,
    }
  },

  computed: {
    users() {
      return useUserStore().users ?? []
    },
  },

  methods: {
    async getAll() {
      await useUserStore().getAll(this.search)
    },

    handleCreate() {
      this.selectedItem = null
      this.isDialogUserVisible = true
    },

    closeUserDialog() {
      this.isDialogUserVisible = false
    },

    handleEdit(item) {
      this.selectedItem = item
      this.isDialogUserVisible = true
    },

    handleDelete(item) {
      this.selectedItem = item
      this.isDialogDeleteVisible = true
    },

    closeDeleteDialog() {
      this.isDialogDeleteVisible = false
    },

    async create(user) {
      await useUserStore().create(user)
      this.closeUserDialog()
    },

    async update(user) {
      await useUserStore().update(user)
      this.closeUserDialog()
    },

    async deleteUser(id) {
      await useUserStore().delete(this.selectedItem.id)
      this.closeDeleteDialog()
    }
  },

  async created() {
    await this.getAll()
  }
}
</script>
