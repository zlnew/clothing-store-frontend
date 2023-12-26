<script setup lang="ts">
import SignUpModal from './SignUpModal.vue'
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

defineProps<{
  refUrl?: string
}>()

const modal = useModalStore()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  console.log(event.data)
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
  <div>
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
        />
      </div>
    </UForm>
  </div>
</template>
