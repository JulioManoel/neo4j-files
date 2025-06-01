<template>
  <div>
    <h1 class="mb-5">{{ $t('title.fileExplorer') }}</h1>

    <VCard>
      <VRow class="mb-2 mx-2 mt-2">
        <VCol cols="12" lg="8" md="8" sm="8">
          <VTextField :placeholder="$t('search.fileExplorer')" v-model="search" single-line hide-details dense
            outlined />
        </VCol>

        <VCol cols="12" lg="2" md="2" sm="2">
          <VBtn color="success" block @click="getAll">
            {{ $t('button.search') }}
            <VIcon class="ml-2">tabler-search</VIcon>
          </VBtn>
        </VCol>

        <VCol cols="12" lg="2" md="2" sm="2">
          <VMenu location="bottom end" transition="fade-transition">
            <template #activator="{ props }">
              <VBtn color="primary" block v-bind="props">
                {{ $t("button.add") }}
                <VIcon class="ml-2">tabler-plus</VIcon>
              </VBtn>
            </template>

            <VList density="compact" rounded="lg">
              <VListItem prepend-icon="mdi-folder" :title="$t('button.createFolder') + ' +'"
                @click="handleCreateFolder" />
              <VListItem prepend-icon="mdi-upload" :title="$t('button.upload') + ' +'" @click="handleUpload" />
            </VList>
          </VMenu>
        </VCol>
      </VRow>
    </VCard>

    <div class="mt-10">
      <VRow>
        <VCol cols="12" lg="2" md="2" sm="2" v-for="folder in folders" :key="folder.id">
          <VCard>
            <VRow class="">
              <VCol class="ma-auto pa-5" cols="6" sm="2" md="2" lg="2">
                <VIcon>tabler-folder</VIcon>
              </VCol>
              
              <VCol>
                <VCardTitle>{{folder.name}}</VCardTitle>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>
    </div>

    <div class="mt-10">
      <VRow>
        <VCol cols="12" lg="3" md="3" sm="3" v-for="file in files" :key="file.id">
          <VCard>
            <VRow class="">
              <VCol class="ma-auto pa-5" cols="6" sm="2" md="2" lg="2">
                <VIcon>tabler-file</VIcon>
              </VCol>
              
              <VCol cols="12" sm="7" md="7" lg="7">
                <VCardTitle>{{file.name}}</VCardTitle>
                <VCardText>{{file.extension}}</VCardText>
              </VCol>

              <VCol class="ma-auto" cols="12" sm="3" md="3" lg="3">
                <VBtn color="transparent" @click="downloadFile(file.id)" flat>
                  <VIcon class="ml-2">tabler-download</VIcon>
                </VBtn>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>
    </div>

    <FolderDialog :isDialogVisible="isDialogFolderVisible" @close="closeDialogs" @create="createFolder" />
    <FileDialog :isDialogVisible="isDialogFileVisible" @close="closeDialogs" @create="createFile" />
  </div>
</template>

<script>
import { useFileSystemStore } from '@/store/fileSystem'
import FolderDialog from '@/components/dialogs/FolderDialog.vue' 
import FileDialog from '@/components/dialogs/FolderDialog.vue' 

export default {
  components: {
    FolderDialog,
    FileDialog
  },

  data() {
    return {
      search: '',
      isDialogFileVisible: false,
      isDialogFolderVisible: false,
    }
  },

  computed: {
    folders() {
      return useFileSystemStore().folders
    },
    files() {
      return useFileSystemStore().files
    }
  },

  methods: {
    async getAll() {
      await useFileSystemStore().getAll(this.search)
    },

    handleCreateFolder() {
      this.isDialogFolderVisible = true
    },

    handleUpload() {
      this.isDialogFileVisible = true
    },

    closeDialogs() {
      this.isDialogFileVisible = false
      this.isDialogFolderVisible = false
    },

    async createFolder(folder) {
      await useFileSystemStore().createFolder(folder)
      this.isDialogFolderVisible = false
    },

    async createFile(file) {
      await useFileSystemStore().createFile(file)
      this.isDialogFileVisible = false
    },

    async downloadFile(fileId) {
      await useFileSystemStore().downloadFile(fileId)
    }
  },

  async created() {
    this.getAll()
  }
}
</script>
