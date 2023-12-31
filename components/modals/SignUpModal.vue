<script setup lang="ts">
import SignInModal from './SignInModal.vue'
import { object, string, ref as yupRef, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  refUrl?: string
}>()

const modal = useModalStore()
const auth = useAuthStore()

const schema = object({
  name: string().max(50).required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required'),
  password_confirmation: string().required('Required')
    .oneOf([yupRef('password')], 'Passwords do not match.')
})

type Schema = InferType<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
  password_confirmation: undefined
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

    const data = await auth.signUp(event.data)

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

function openSignInModal () {
  modal.open({
    title: 'Sign In to Zee Apparel',
    component: SignInModal,
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
      id="signup-error"
      icon="i-mdi-alert-circle"
      color="red"
      :title="validationError.message"
      :timeout="0"
      @close="validationError = undefined"
    />

    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <div class="space-y-2">
        <UFormGroup label="Full Name" name="name">
          <UInput
            v-model="state.name"
            placeholder="Full Name"
            size="xl"
          />
        </UFormGroup>
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
        <UFormGroup label="Confirm Password" name="password_confirmation">
          <UInput
            type="password"
            v-model="state.password_confirmation"
            placeholder="Confirm Password"
            size="xl"
          />
        </UFormGroup>
        <UButton
          label="Already have an account? Sign In"
          color="black"
          variant="link"
          size="xl"
          :padded="false"
          @click="openSignInModal"
        />
      </div>

      <div class="mt-6 flex items-center justify-end gap-2">
        <UButton
          icon="i-mdi-google"
          label="Sign Up with Google"
          color="white"
          size="xl"
        />
        <UButton
          type="submit"
          label="Sign Up"
          color="black"
          size="xl"
          :leading="loading"
        />
      </div>
    </UForm>
  </div>
</template>
