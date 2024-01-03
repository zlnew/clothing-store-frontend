<script setup lang="ts">
import SignInModal from './SignInModal.vue'
import { object, string, ref as yupRef, type InferType } from 'yup'

const toast = useToast()
const modal = useModal()
const { register } = useAuth()

const schema = object({
  name: string().max(50).required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required'),
  password_confirmation: string().required('Required')
    .oneOf([yupRef('password')], 'Passwords do not match.')
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const { submit, processing, validationMessage } = useSubmit(
  () => register(state), {
    onSuccess: () => {
      modal.close()
      toast.add({ title: 'Login Successful' })
    }
  }
)

function openSignInModal () {
  modal.open({
    title: 'Sign In to Zee Apparel',
    component: SignInModal
  })
}
</script>

<template>
  <div class="space-y-4">
    <ErrorNotification
      :message="validationMessage"
      @close="validationMessage = null"
    />

    <UForm :schema="schema" :state="state" @submit="submit">
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
      </div>

      <div class="mt-6 flex items-center justify-between gap-2">
        <UButton
          icon="i-mdi-arrow-left"
          label="Login"
          color="black"
          size="xl"
          @click="openSignInModal"
        />
        <UButton
          type="submit"
          label="Register"
          color="yellow"
          size="xl"
          :loading="processing"
        />
      </div>
    </UForm>
  </div>
</template>
