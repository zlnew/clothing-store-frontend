<script setup lang="ts">
import SignUpModal from './SignUpModal.vue'
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  refUrl?: string
}>()

const modal = useModalStore()
const auth = useAuthStore()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

interface ValidationErrorResponse {
  message: string
  errors: Record<string, string[]>
}

const validationError = ref<ValidationErrorResponse>()
const loading = ref(false)

async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true

    const data = await auth.signIn(event.data)

    await auth.setCredentials({
      accessToken: data.access_token,
      user: data.user
    })

    window.location.href = props.refUrl || window.location.href
  } catch (err: any) {
    if (err.response && err.response.status === 422) {
      validationError.value = err.data
    }
  } finally {
    loading.value = false
  }
}

function openSignUpModal () {
  modal.open({
    title: 'Sign Up to Zee Apparel',
    component: SignUpModal,
    componentProps: {
      refUrl: window.location.href
    }
  })
}
</script>

<template>
  <div class="space-y-4">
    <UNotification
      v-if="validationError"
      id="signin-error"
      icon="i-mdi-alert-circle"
      color="red"
      :title="validationError.message"
      :timeout="0"
      @close="validationError = undefined"
    />

    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <div class="space-y-2">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="state.email"
            placeholder="Email"
            size="xl"
          />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput
            type="password"
            v-model="state.password"
            placeholder="Password"
            size="xl"
          />
        </UFormGroup>
        <UButton
          label="Don't have an account? Sign Up"
          color="black"
          variant="link"
          size="xl"
          :padded="false"
          @click="openSignUpModal"
        />
      </div>

      <div class="mt-6 flex items-center justify-end gap-2">
        <UButton
          icon="i-mdi-google"
          label="Sign In with Google"
          color="white"
          size="xl"
        />
        <UButton
          type="submit"
          label="Sign In"
          color="black"
          size="xl"
          :loading="loading"
        />
      </div>
    </UForm>
  </div>
</template>
