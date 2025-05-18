<script setup>
import { useAuthStore } from '@/store/auth'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRouter } from 'vue-router';
const router = useRouter()

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const refVForm = ref()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isLoadding = ref(false)
const isPasswordVisible = ref(false)

const login = (email, password) => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (!isValid) return
    isLoadding.value = true
    await useAuthStore().login(email, password)
    isLoadding.value = false
    router.push('/')
  })
}
</script>

<template>
  <a href="javascript:void(0)">
    <div class="auth-logo d-flex align-center gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />
      <h1 class="auth-title">
        {{ themeConfig.app.title }}
      </h1>
    </div>
  </a>

  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol md="8" class="d-none d-md-flex">
      <div class="position-relative bg-background w-100 me-0">
        <div class="d-flex align-center justify-center w-100 h-100" style="padding-inline: 6.25rem;">
          <VImg max-width="613" src="/images/Neo4j-logo.png" class="auth-illustration mt-16 mb-2" />
        </div>
      </div>
    </VCol>

    <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-6">
        <VCardText>
          <h4 class="text-h4 mb-1">
            {{ $t('title.welcome') }} <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4>
        </VCardText>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="login(form.email, form.password)">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField v-model="form.email" autofocus label="Email" type="email"
                  placeholder="johndoe@email.com" :rules="[requiredValidator, emailValidator]" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField v-model="form.password" label="Password" placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'" autocomplete="password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" :rules="[requiredValidator]" />

                <VBtn class="mt-6" block type="submit" :loading="isLoadding">
                  {{ $t('button.login') }}
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
