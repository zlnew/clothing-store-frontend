<script setup lang="ts">
import SignUpModal from './SignUpModal.vue'
import { object, string, type InferType, boolean } from 'yup'

const props = defineProps<{
  refUrl?: string
}>()

const modal = useModal()
const { login } = useAuth()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required'),
  remember: boolean()
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
  email: '',
  password: '',
  remember: false
})

const { submit, processing, validationMessage } = useSubmit(
  () => login(state), {
    onSuccess: () => {
      window.location.href = props.refUrl || window.location.href
    }
  }
)

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
    <ErrorNotification
      :message="validationMessage"
      @close="validationMessage = null"
    />

    <UForm :schema="schema" :state="state" @submit="submit">
      <div class="space-y-2">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Email"
            size="xl"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Password"
            size="xl"
          />
        </UFormGroup>

        <UCheckbox
          v-model="state.remember"
          name="remember"
          label="Remember Me"
        />
      </div>

      <div class="mt-6 flex items-center justify-between gap-2">          
        <UButton
          label="Register"
          color="yellow"
          size="xl"
          @click="openSignUpModal"
        />
        <UButton
          type="submit"
          label="Login"
          color="black"
          size="xl"
          :loading="processing"
        />
      </div>
    </UForm>
  </div>
</template>
