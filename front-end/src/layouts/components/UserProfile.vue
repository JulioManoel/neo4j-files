<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VAvatar color="primary" variant="tonal">
        {{ user.name.substring(0, 1).toUpperCase() + user.name.substring(1, 2).toLowerCase() }}
      </VAvatar>

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    {{ user.name.substring(0, 1).toUpperCase() + user.name.substring(1, 2).toLowerCase() }}
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user.name }}
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logout()">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>

            <VListItemTitle>{{ $t('button.logout') }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export default {
  computed: {
    user() {
      return useAuthStore().user
    }
  },

  methods: {
    async logout() {
      await useAuthStore().logout()
      const router = useRouter()
      router.push('/login')
    }
  }
}
</script>
